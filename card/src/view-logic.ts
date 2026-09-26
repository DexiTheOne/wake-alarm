/**
 * Small pure view-logic helpers with no Lit / DOM dependency, so they can be
 * unit-tested in the plain-node vitest environment (mirrors the integration's
 * `_pure.py`). Keep anything that touches `customElements` / rendering out.
 */

/**
 * Whether the media-only controls (the Media picker section, "Test music" and
 * "Test urgent notification" buttons) should be shown.
 *
 * False for a lights-only alarm (no media players configured, #22 / #46):
 * those controls are dead — `test_music` no-ops server-side and `test_urgent`
 * has no real speaker to name — so hiding them avoids confusing the user.
 */
export function showsMediaControls(players: readonly string[] | undefined): boolean {
  return !!players && players.length > 0;
}


/** Uses the HA timezone, regardless of the browser timezone. */
export function alarmStatusLabel(iso: string, attrs: Record<string, unknown>): string {
  const dt = new Date(iso);
  if (Number.isNaN(dt.getTime())) return "No upcoming alarm";
  const timeZone = typeof attrs.timezone === "string" ? attrs.timezone : undefined;
  const weekday = new Intl.DateTimeFormat(undefined, { weekday: "short", timeZone }).format(dt);
  if (attrs.adjusted === true && attrs.adjusted_from && attrs.adjusted_time && attrs.adjusted_from !== attrs.adjusted_time) {
    return `${weekday}, adjusted ${attrs.adjustment_direction} from ${attrs.adjusted_from} to ${attrs.adjusted_time}`;
  }
  return new Intl.DateTimeFormat(undefined, { weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false, timeZone }).format(dt);
}

/** The nearest scheduled occurrence includes days skipped by a one-time exception. */
export function alarmBarStatus(enabled: boolean, attrs: Record<string, unknown>): {label: string; color: string} {
  if (!enabled) return {label: "Off", color: "red"};
  const days = Object.values((attrs.day_status ?? {}) as Record<string, {date: string; enabled: boolean; override: boolean | null}>);
  const nearest = days.filter((day) => day.date && (day.enabled || day.override !== null)).sort((a, b) => a.date.localeCompare(b.date))[0];
  if (nearest?.override === false) return {label: "One Time Off", color: "grey"};
  if (nearest?.override === true) return {label: "One Time On", color: "blue"};
  if (attrs.adjusted === true && attrs.adjusted_from !== attrs.adjusted_time) return {label: "On", color: "blue"};
  return {label: "On", color: attrs.next_alarm_date ? "green" : "grey"};
}

/** Target a skipped one-time occurrence first, otherwise the next enabled day. */
export function nextAlarmDay(attrs: Record<string, unknown>): string | undefined {
  const days = Object.entries((attrs.day_status ?? {}) as Record<string, {date: string; enabled: boolean; override: boolean | null}>);
  const candidates = days.filter(([, day]) => day.date && (day.enabled || day.override !== null));
  return (candidates.length ? candidates : days).sort(([, a], [, b]) => a.date.localeCompare(b.date))[0]?.[0];
}
