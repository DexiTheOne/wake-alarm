"""Pure helpers with zero Home Assistant imports.

Anything in this module can be unit-tested in isolation by loading the
file directly (importlib.util.spec_from_file_location), no HA fixtures
required. Modules that need HA depend on this one rather than the other
way around.
"""

from __future__ import annotations

from datetime import datetime, timedelta
from datetime import time as dt_time
from typing import NamedTuple

# -------------------- light ramp math --------------------


def compute_step_target(
    idx: int, total_steps: int, max_pct: int, start_k: int, target_k: int
) -> tuple[int, int]:
    """Per-step linear interpolation.

    Returns (brightness_pct, kelvin) for the given 0-based step index.
    Mirrors scripts.alarm_light_ramp's idx ∈ [0, total_steps-1] interpolation
    using denom = total_steps - 1.
    """
    if total_steps <= 1:
        return max_pct, target_k
    denom = total_steps - 1
    pct = round(1.0 + ((max_pct - 1.0) / denom) * idx)
    kelvin = round(start_k + ((target_k - start_k) / denom) * idx)
    return int(pct), int(kelvin)


def clamp_kelvin(k: int) -> int:
    if k < 1500:
        return 1500
    if k > 6500:
        return 6500
    return k


# -------------------- schedule math --------------------


def compute_next_fire(
    now: datetime,
    alarm_time: dt_time,
    enabled_days: set[int],
    day_times: dict[int, dt_time] | None = None,
) -> datetime | None:
    """Next future occurrence of alarm_time on an enabled day.

    For each weekday offset 0..7, materialise alarm_time on that day and
    return the first candidate that is both on an enabled day AND strictly
    in the future. Day boundaries roll over correctly because we anchor on
    `now`'s timezone-aware date and walk forward in 1-day steps.

    DST: candidates stay timezone-aware and zoneinfo recomputes the UTC
    offset from the wall-clock fields, so an ordinary alarm on the far side
    of a transition still fires at the intended wall-clock time (#36). Alarm
    times that land in a spring-forward gap or a fall-back overlap resolve via
    Python's default fold=0 semantics to a single deterministic instant (the
    earliest valid one); test_schedule pins this behaviour.
    """
    if not enabled_days:
        return None
    today_at = now.replace(
        hour=alarm_time.hour,
        minute=alarm_time.minute,
        second=alarm_time.second,
        microsecond=0,
    )
    for offset in range(0, 8):
        candidate = today_at + timedelta(days=offset)
        chosen = (day_times or {}).get(candidate.weekday(), alarm_time)
        candidate = candidate.replace(
            hour=chosen.hour, minute=chosen.minute, second=chosen.second
        )
        if candidate.weekday() in enabled_days and candidate > now:
            return candidate
    return None


class ScheduleDecision(NamedTuple):
    """Outcome of deciding what the scheduler should do right now.

    next_fire           the alarm_time we are aiming for (catch-up target if
                        fire_now is set, otherwise the next future occurrence);
                        None when nothing is scheduled.
    ramp_start          next_fire - length_min, or None when next_fire is None.
    fire_now            True when alarm_time on an enabled day has already
                        passed within the grace window (HA was down) and we
                        should fire the alarm immediately.
    inside_ramp_window  True when now falls between ramp_start and next_fire
                        (informational; lets callers decide on a partial ramp).
    """

    next_fire: datetime | None
    ramp_start: datetime | None
    fire_now: bool
    inside_ramp_window: bool


def plan_schedule(
    now: datetime,
    alarm_time: dt_time,
    enabled_days: set[int],
    length_min: int,
    grace_min: int,
    day_times: dict[int, dt_time] | None = None,
) -> ScheduleDecision:
    """Decide whether to fire now (catch-up), arm timers, or skip.

    Wraps compute_next_fire and layers a restart catch-up window on top: if
    today's alarm sits on an enabled day, has already passed, and did so within
    `grace_min` minutes, we return fire_now=True targeting today so the alarm
    still goes off after a late boot. Otherwise we return the next strictly
    future occurrence with fire_now=False.

    Pure: no Home Assistant imports, fully unit-testable.
    """
    if not enabled_days:
        return ScheduleDecision(None, None, False, False)

    length = timedelta(minutes=length_min)
    today_time = (day_times or {}).get(now.weekday(), alarm_time)
    today_at = now.replace(
        hour=today_time.hour,
        minute=today_time.minute,
        second=today_time.second,
        microsecond=0,
    )

    if (
        today_at.weekday() in enabled_days
        and today_at <= now
        and (now - today_at) <= timedelta(minutes=grace_min)
    ):
        ramp_start = today_at - length
        return ScheduleDecision(
            next_fire=today_at,
            ramp_start=ramp_start,
            fire_now=True,
            inside_ramp_window=ramp_start <= now,
        )

    future = compute_next_fire(now, alarm_time, enabled_days, day_times)
    if future is None:
        return ScheduleDecision(None, None, False, False)
    ramp_start = future - length
    return ScheduleDecision(
        next_fire=future,
        ramp_start=ramp_start,
        fire_now=False,
        inside_ramp_window=ramp_start <= now < future,
    )


# -------------------- notification action IDs --------------------


_ACTION_PREFIX = "wake_alarm:"


def build_action_id(action: str, entry_id: str) -> str:
    """Build a stable, parseable action ID for a notification button."""
    return f"{_ACTION_PREFIX}{action}:{entry_id}"


def parse_action_id(action: str) -> tuple[str, str] | None:
    """Inverse of build_action_id. Returns (action, entry_id) or None.

    Rejects malformed strings: missing prefix, fewer than three parts, or
    either part empty.
    """
    if not action.startswith(_ACTION_PREFIX):
        return None
    parts = action.split(":", 2)
    if len(parts) != 3:
        return None
    action_name, entry_id = parts[1], parts[2]
    if not action_name or not entry_id:
        return None
    return action_name, entry_id


def plan_daily_schedule(
    now: datetime,
    alarm_time: dt_time,
    enabled_days: set[int],
    day_times: dict[int, dt_time],
    length_min: int,
    grace_min: int = 0,
    override: datetime | None = None,
    consumed_date: str | None = None,
    skip_date: str | None = None,
    day_overrides: dict[int, dict] | None = None,
) -> ScheduleDecision:
    """Select one occurrence per local calendar day, including a one-shot time.

    A consumed occurrence stays consumed across restarts and time edits, so
    moving an alarm earlier cannot cause its regular time to fire as well.
    Compare UTC instants to handle the repeated hour at the end of DST.
    """
    from datetime import timezone

    for offset in range(15):
        day = now.date() + timedelta(days=offset)
        enabled = day.weekday() in enabled_days
        exception = (day_overrides or {}).get(day.weekday())
        if exception and exception.get("date") == day.isoformat():
            enabled = exception["enabled"]
        if not enabled:
            continue
        if (
            consumed_date and day.isoformat() <= consumed_date
        ) or day.isoformat() == skip_date:
            continue
        chosen = day_times.get(day.weekday(), alarm_time)
        candidate = datetime.combine(day, chosen, tzinfo=now.tzinfo)
        if override is not None and override.date() == day:
            candidate = override
        # Normalize a nonexistent spring-forward time to its real instant.
        candidate = candidate.astimezone(timezone.utc).astimezone(now.tzinfo)
        delta = (
            candidate.astimezone(timezone.utc) - now.astimezone(timezone.utc)
        ).total_seconds()
        if delta <= 0 and not (
            offset == 0 and grace_min > 0 and delta >= -grace_min * 60
        ):
            continue
        ramp = (
            candidate.astimezone(timezone.utc) - timedelta(minutes=length_min)
        ).astimezone(now.tzinfo)
        return ScheduleDecision(
            candidate,
            ramp,
            delta <= 0,
            ramp.astimezone(timezone.utc)
            <= now.astimezone(timezone.utc)
            < candidate.astimezone(timezone.utc),
        )
    return ScheduleDecision(None, None, False, False)
