import { customElement } from "./register-element";
import { LitElement, css, html, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { alarmStatusLabel, alarmBarStatus, nextAlarmDay, cardAlarmAttributes } from "./view-logic";
import { sharedStyles } from "./styles";
import { DAYS, type DayKey, type HomeAssistant, type RelatedEntities } from "./types";

@customElement("wake-alarm-main-view")
export class WakeAlarmMainView extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public related?: RelatedEntities;

  @property({ attribute: false }) private _adjustError = "";
  private _tickInterval?: number;

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopTicker();
  }

  protected updated(): void {
    // Only tick while we're actually showing a snooze countdown. Stops
    // a 1Hz no-op render loop running for the lifetime of the card on
    // every dashboard. Lifecycle: ticker starts the first render that
    // sees fsmState==="snoozing" and stops the next render where it
    // isn't (e.g. snooze finishes, dismiss, etc.).
    const fsmState =
      this.hass && this.related
        ? this.hass.states[this.related.sensors.state]?.state
        : undefined;
    if (fsmState === "snoozing") {
      this._startTicker();
    } else {
      this._stopTicker();
    }
  }

  private _startTicker(): void {
    if (this._tickInterval !== undefined) return;
    this._tickInterval = window.setInterval(() => this.requestUpdate(), 1000);
  }

  private _stopTicker(): void {
    if (this._tickInterval !== undefined) {
      window.clearInterval(this._tickInterval);
      this._tickInterval = undefined;
    }
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.related) return html``;
    const r = this.related;
    const enabledState = this.hass.states[r.enabled];
    const stateState = this.hass.states[r.sensors.state];
    const activeState = this.hass.states[r.active];
    const alarmTimeState = this.hass.states[r.alarmTime];
    const nextAlarmState = this.hass.states[r.sensors.next_alarm];

    const cardAttrs = cardAlarmAttributes(nextAlarmState?.attributes ?? {});
    const isEnabled = enabledState?.state === "on";
    const fsmState = stateState?.state ?? "idle";
    const isActive = activeState?.state === "on";
    const time = parseTime((cardAttrs.next_alarm_time as string | undefined) ?? alarmTimeState?.state);

    const modeIcon = ICONS[fsmState] ?? ICONS.idle;
    const barStatus = alarmBarStatus(isEnabled, nextAlarmState?.attributes ?? {});
    const modeLabel = fsmState === "idle" ? barStatus.label : labelForFsmState(fsmState);

    const snoozeUntilRaw = stateState?.attributes?.snooze_until as
      | string
      | null
      | undefined;
    const snoozeCountdown =
      fsmState === "snoozing" && snoozeUntilRaw
        ? formatCountdown(snoozeUntilRaw)
        : null;

    const nextLabel = snoozeCountdown
      ? `Music in ${snoozeCountdown}`
      : nextAlarmState?.state && nextAlarmState.state !== "unknown"
        ? alarmStatusLabel(nextAlarmState.state, nextAlarmState.attributes)
        : "No upcoming alarm";

    return html`
      <ha-card>
        <div class="header">
          <ha-icon icon="mdi:alarm"></ha-icon>
          <div class="title">${this._instanceName()}</div>
          <ha-icon-button
            label="Settings"
            @click=${this._goSettings}
          >
            <ha-icon icon="mdi:cog"></ha-icon>
          </ha-icon-button>
        </div>

        <div role="button" tabindex=${isEnabled ? "0" : "-1"} aria-disabled=${!isEnabled} @keydown=${(event: KeyboardEvent) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); this._handleModeTileClick(); } }} class="mode-tile mode-${isEnabled ? fsmState : "off"} status-${barStatus.color}" @click=${this._handleModeTileClick}>
          <ha-icon icon=${modeIcon}></ha-icon>
          <div class="mode-text">
            <div class="mode-label">${modeLabel}</div>
            <div class="mode-next">${isEnabled ? nextLabel : ""}</div>
          </div>
        </div>

        <div class="time-picker">
          <div class="time-col">
            <ha-icon-button @click=${() => this._adjustTime(1, 0)}>
              <ha-icon icon="mdi:menu-up"></ha-icon>
            </ha-icon-button>
            <div class="time-num">${pad(time.h)}</div>
            <ha-icon-button @click=${() => this._adjustTime(-1, 0)}>
              <ha-icon icon="mdi:menu-down"></ha-icon>
            </ha-icon-button>
          </div>
          <div class="time-sep">:</div>
          <div class="time-col">
            <ha-icon-button @click=${() => this._adjustTime(0, 1)}>
              <ha-icon icon="mdi:menu-up"></ha-icon>
            </ha-icon-button>
            <div class="time-num">${pad(time.m)}</div>
            <ha-icon-button @click=${() => this._adjustTime(0, -1)}>
              <ha-icon icon="mdi:menu-down"></ha-icon>
            </ha-icon-button>
          </div>
        </div>

        <div class="day-chips">
          ${DAYS.map((d) => this._renderDayChip(d))}
        </div>

        ${this._adjustError ? html`<div role="alert">${this._adjustError}</div>` : null}
        ${isActive ? this._renderActiveActions(fsmState) : null}
      </ha-card>
    `;
  }

  private _renderDayChip(day: DayKey): TemplateResult {
    if (!this.hass || !this.related) return html``;
    const id = this.related.days[day];
    const on = this.hass.states[id]?.state === "on";
    const status = this.hass.states[this.related.sensors.next_alarm]?.attributes?.day_status as Record<string, {override: boolean | null}> | undefined;
    const override = status?.[day]?.override;
    const color = override === true ? "once-on" : override === false ? "once-off" : on ? "on" : "off";
    return html`
      <div
        class="chip chip-${color}" role="button" tabindex="0"
        aria-label=${`${LABELS[day]} ${override === true ? "enabled once" : override === false ? "disabled once" : on ? "enabled" : "disabled"}`}
        @keydown=${(event: KeyboardEvent) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); this._toggleDay(day); } }}
        @click=${() => this._toggleDay(day)}
      >
        <ha-icon icon=${(override ?? on) ? "mdi:check-circle" : "mdi:close-circle-outline"}></ha-icon>
        <span>${LABELS[day]}</span>
        <span class="day-time">${(this.hass.states[this.related.dayTimes?.[day] ?? this.related.alarmTime]?.state ?? "--:--").slice(0, 5)}</span>
      </div>
    `;
  }

  private _renderActiveActions(fsmState: string): TemplateResult {
    return html`
      <div class="action-row">
        ${fsmState === "ramping"
          ? html`
              <button class="action-btn cancel-ramp" @click=${this._cancelRamp}>
                <ha-icon icon="mdi:weather-sunset-down"></ha-icon>
                <span>Cancel ramp</span>
              </button>
            `
          : null}
        <button class="action-btn snooze" @click=${this._snooze}>
          <ha-icon icon="mdi:alarm-snooze"></ha-icon>
          <span>Snooze</span>
        </button>
        <button class="action-btn dismiss" @click=${this._dismiss}>
          <ha-icon icon="mdi:alarm-off"></ha-icon>
          <span>Dismiss</span>
        </button>
      </div>
    `;
  }

  private _cancelRamp = (): void => {
    if (!this.hass || !this.related) return;
    void this.hass.callService("button", "press", {
      entity_id: this.related.buttons.cancel_ramp,
    });
  };

  private _instanceName(): string {
    if (!this.hass || !this.related) return "Wake Alarm";
    // Integration mirrors the user-given name as an attribute on the
    // next_alarm sensor — use that so the title is locale-safe (we used
    // to strip /\s+Enabled$/ off the friendly_name which only worked in
    // English).
    const sensor = this.hass.states[this.related.sensors.next_alarm];
    const name = sensor?.attributes?.instance_name as string | undefined;
    return name && name.trim() ? name : "Wake Alarm";
  }

  private _handleModeTileClick = (): void => {
    // While the alarm is active (ramping / playing / snoozing) tapping
    // the mode tile shouldn't disarm the alarm — the user is likely
    // reading a countdown or status, not trying to flip it off. The
    // Snooze + Dismiss buttons (and Cancel ramp during ramping) handle
    // those actions explicitly.
    if (!this.hass || !this.related) return;
    if (this.hass.states[this.related.enabled]?.state !== "on") return;
    const fsm = this.hass.states[this.related.sensors.state]?.state;
    if (fsm && fsm !== "idle") return;
    if (cardAlarmAttributes(this.hass.states[this.related.sensors.next_alarm]?.attributes ?? {}).adjusted === true) {
      void this._clearAdjustment();
    } else {
      const day = nextAlarmDay(this.hass.states[this.related.sensors.next_alarm]?.attributes ?? {});
      if (day && DAYS.includes(day as DayKey)) this._toggleDay(day as DayKey);
    }
  };

  private _toggleDay(day: DayKey): void {
    if (!this.hass || !this.related) return;
    void this.hass.callService("wake_alarm", "toggle_day_once", {
      entity_id: this.related.enabled, day,
    }).catch((error: {message?: string}) => { this._adjustError = error.message ?? "Could not change this day"; });
  }

  private async _adjustTime(dh: number, dm: number): Promise<void> {
    if (!this.hass || !this.related) return;
    const next = this.hass.states[this.related.sensors.next_alarm];
    const attrs = cardAlarmAttributes(next?.attributes ?? {});
    const cur = parseTime(attrs.next_alarm_time as string | undefined);
    let h = cur.h + dh;
    let m = cur.m + dm;
    if (m >= 60) { m -= 60; h += 1; }
    if (m < 0) { m += 60; h -= 1; }
    h = ((h % 24) + 24) % 24;
    this._adjustError = "";
    try {
      if (attrs.adjusted === true && `${pad(h)}:${pad(m)}` === attrs.adjusted_from) {
        await this._clearAdjustment();
        return;
      }
      await this.hass.callService("wake_alarm", "adjust_next_alarm", {
        entity_id: this.related.enabled,
        time: `${pad(h)}:${pad(m)}:00`,
        expected_date: attrs.next_alarm_date,
      });
    } catch (error) {
      this._adjustError = (error as { message?: string }).message ?? "Could not adjust the next alarm";
    }
  }

  private _clearAdjustment = async (): Promise<void> => {
    if (!this.hass || !this.related) return;
    try {
      await this.hass.callService("wake_alarm", "clear_adjustment", {entity_id: this.related.enabled});
      this._adjustError = "";
    } catch (error) {
      this._adjustError = (error as { message?: string }).message ?? "Could not clear the adjustment";
    }
  };

  private _snooze = (): void => {
    if (!this.hass || !this.related) return;
    void this.hass.callService("button", "press", {
      entity_id: this.related.buttons.snooze,
    });
  };

  private _dismiss = (): void => {
    if (!this.hass || !this.related) return;
    void this.hass.callService("button", "press", {
      entity_id: this.related.buttons.dismiss,
    });
  };

  private _goSettings = (): void => {
    this.dispatchEvent(
      new CustomEvent("navigate-settings", { bubbles: true, composed: true }),
    );
  };

  static styles = [
    sharedStyles,
    css`
      .mode-tile {
        display: flex;
        box-sizing: border-box;
        height: 80px;
        border: 1px solid transparent;
        align-items: center;
        gap: 16px;
        padding: 16px;
        border-radius: var(--wa-radius);
        cursor: pointer;
        transition: background 0.15s ease;
      }
      .mode-tile[aria-disabled="true"] { cursor: default; }
      .mode-tile ha-icon {
        --mdc-icon-size: 36px;
        flex: 0 0 36px;
      }
      .mode-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
      .mode-label { font-size: 1rem; line-height: 24px; font-weight: 500; }
      .mode-next { font-size: 0.85rem; line-height: 20px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

      .mode-off {
        background: var(--ha-card-background, var(--card-background-color));
        border: 1px solid var(--divider-color);
      }
      .mode-off ha-icon { color: var(--disabled-text-color); }
      .mode-idle {
        background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.12);
      }
      .mode-idle ha-icon { color: var(--primary-color); }
      .mode-ramping {
        background: rgba(255, 165, 0, 0.18);
      }
      .mode-ramping ha-icon { color: rgb(255, 165, 0); }
      .mode-playing {
        background: rgba(76, 175, 80, 0.20);
      }
      .mode-playing ha-icon { color: rgb(76, 175, 80); }
      .mode-snoozing {
        background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.20);
      }
      .mode-snoozing ha-icon { color: var(--primary-color); }

      .mode-tile.status-red ha-icon { color: rgb(244, 67, 54); }
      .mode-tile.status-green ha-icon { color: rgb(76, 175, 80); }
      .mode-tile.status-blue ha-icon { color: rgb(33, 150, 243); }
      .mode-tile.status-grey ha-icon { color: var(--disabled-text-color); }

      .time-picker {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      .time-col {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .time-num {
        font-size: 2.2rem;
        font-variant-numeric: tabular-nums;
        font-weight: 500;
        min-width: 64px;
        text-align: center;
      }
      .time-sep {
        font-size: 2.2rem;
        line-height: 2.2rem;
        color: var(--secondary-text-color);
      }

      .day-time { font-size: 0.75rem; font-variant-numeric: tabular-nums; }
      .daily-times { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
      .daily-time { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
      .daily-time input { font: inherit; color: var(--primary-text-color); background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: 8px; padding: 8px; min-width: 0; }
      .day-chips {
        display: flex;
        gap: 8px;
        justify-content: space-between;
      }
      .chip {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 8px 4px;
        border-radius: var(--wa-radius);
        cursor: pointer;
        font-size: 0.8rem;
        background: var(--ha-card-background, var(--card-background-color));
        border: 1px solid var(--divider-color);
        user-select: none;
      }
      .chip-on ha-icon { color: rgb(76, 175, 80); }
      .chip-off ha-icon { color: var(--disabled-text-color); }
      .chip-on { border-color: rgba(76, 175, 80, 0.4); }
      .chip-once-on { border-color: var(--primary-color); background: rgba(33,150,243,0.12); }
      .chip-once-on ha-icon { color: rgb(33,150,243); }
      .chip-once-off { border-color: rgb(244,67,54); background: rgba(244,67,54,0.12); }
      .chip-once-off ha-icon { color: rgb(244,67,54); }

      /* Snooze + Dismiss share the mode-tile vibe: tall, prominent,
         half-width each so they line up under the mode tile. */
      .action-row {
        display: flex;
        gap: 12px;
      }
      .action-btn {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        padding: 16px;
        border-radius: var(--wa-radius);
        border: 1px solid var(--divider-color);
        background: var(--ha-card-background, var(--card-background-color));
        color: var(--primary-text-color);
        font-size: 1rem;
        font-weight: 500;
        font-family: inherit;
        cursor: pointer;
        transition: background 0.15s ease;
      }
      .action-btn:hover { background: var(--secondary-background-color); }
      .action-btn ha-icon { --mdc-icon-size: 32px; }
      .action-btn.snooze {
        background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.14);
      }
      .action-btn.snooze ha-icon { color: var(--primary-color); }
      .action-btn.dismiss {
        background: rgba(255, 82, 82, 0.14);
        color: rgb(255, 82, 82);
      }
      .action-btn.dismiss ha-icon { color: rgb(255, 82, 82); }
      .action-btn.cancel-ramp {
        background: rgba(255, 165, 0, 0.16);
      }
      .action-btn.cancel-ramp ha-icon { color: rgb(255, 165, 0); }
    `,
  ];
}

const ICONS: Record<string, string> = {
  idle: "mdi:alarm",
  ramping: "mdi:weather-sunset-up",
  playing: "mdi:music-note",
  snoozing: "mdi:alarm-snooze",
  off: "mdi:alarm-off",
};

const LABELS: Record<DayKey, string> = {
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
};

function labelForFsmState(s: string): string {
  switch (s) {
    case "ramping": return "Ramping";
    case "playing": return "Playing";
    case "snoozing": return "Snoozing";
    default: return "On";
  }
}

function parseTime(raw: string | undefined): { h: number; m: number } {
  if (!raw) return { h: 7, m: 0 };
  const m = /^(\d{1,2}):(\d{1,2})/.exec(raw);
  if (!m) return { h: 7, m: 0 };
  return { h: parseInt(m[1]!, 10), m: parseInt(m[2]!, 10) };
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function formatCountdown(iso: string): string {
  const target = new Date(iso).getTime();
  if (Number.isNaN(target)) return iso;
  const remaining = Math.max(0, Math.round((target - Date.now()) / 1000));
  const min = Math.floor(remaining / 60);
  const sec = remaining % 60;
  return `${min}:${pad(sec)}`;
}
