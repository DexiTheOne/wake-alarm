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


/** Selected occurrence can be skipped while HA's next firing moves forward. */
export function cardAlarmAttributes(attrs: Record<string, unknown>): Record<string, unknown> {
  return attrs.card_alarm && typeof attrs.card_alarm === "object"
    ? {...attrs, ...(attrs.card_alarm as Record<string, unknown>)} : attrs;
}

/** Uses the HA timezone, regardless of the browser timezone. */
export function alarmStatusLabel(iso: string, rawAttrs: Record<string, unknown>): string {
  const attrs = cardAlarmAttributes(rawAttrs);
  const date = typeof attrs.next_alarm_date === "string" ? attrs.next_alarm_date : undefined;
  const time = typeof attrs.next_alarm_time === "string" ? attrs.next_alarm_time : undefined;
  const dt = date ? new Date(`${date}T12:00:00Z`) : new Date(iso);
  if (Number.isNaN(dt.getTime())) return "No upcoming alarm";
  const weekday = new Intl.DateTimeFormat(undefined, { weekday: "short", timeZone: date ? "UTC" : typeof attrs.timezone === "string" ? attrs.timezone : undefined }).format(dt);
  if (attrs.adjusted === true && attrs.adjusted_from && attrs.adjusted_time && attrs.adjusted_from !== attrs.adjusted_time) {
    const minutes = (value: unknown) => String(value).split(":").slice(0, 2).reduce((h, part) => h * 60 + Number(part), 0);
    const diff = Math.abs(minutes(attrs.adjusted_time) - minutes(attrs.adjusted_from));
    const hours = Math.floor(diff / 60);
    const remainder = diff % 60;
    const duration = [hours ? `${hours} ${hours === 1 ? "Hour" : "Hours"}` : "", remainder ? `${remainder} ${remainder === 1 ? "Minute" : "Minutes"}` : ""].filter(Boolean).join(" ");
    return `${weekday}, ${attrs.adjustment_direction === "earlier" ? "Earlier" : "Later"} by ${duration}`;
  }
  return time ? `${weekday} ${time.slice(0, 5)}` : new Intl.DateTimeFormat(undefined, { weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: typeof attrs.timezone === "string" ? attrs.timezone : undefined }).format(dt);
}

/** The nearest scheduled occurrence includes days skipped by a one-time exception. */
export function alarmBarStatus(enabled: boolean, rawAttrs: Record<string, unknown>): {label: string; color: string} {
  if (!enabled) return {label: "Off", color: "red"};
  const attrs = cardAlarmAttributes(rawAttrs);
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
