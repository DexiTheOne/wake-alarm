// @vitest-environment happy-dom
import { expect, it, vi } from "vitest";
import { WakeAlarmSettingsView } from "../src/settings-view";
import { DAYS } from "../src/types";

it("renders saved weekday times and enables without any schedule input", async () => {
  const element = new WakeAlarmSettingsView();
  const callService = vi.fn();
  const days = Object.fromEntries(DAYS.map(day => [day, `switch.${day}`]));
  const dayTimes = Object.fromEntries(DAYS.map(day => [day, `time.${day}`]));
  const states: Record<string, any> = {"sensor.next": {attributes: {}}, "sensor.media": {state: "none"}};
  for (const day of DAYS) {
    states[`switch.${day}`] = {state: day === "sat" ? "off" : "on"};
    states[`time.${day}`] = {state: "08:40:00"};
  }
  element.related = {days, dayTimes, numbers: {}, sensors: {next_alarm: "sensor.next", media_selection: "sensor.media"}} as any;
  element.hass = {states, callService} as any;
  document.body.append(element);
  await element.updateComplete;
  expect(element.shadowRoot!.querySelectorAll(".saved-day")).toHaveLength(7);
  expect(element.shadowRoot!.querySelector('input[type="time"], ha-switch')).toBeNull();
  for (const row of element.shadowRoot!.querySelectorAll(".saved-day")) row.dispatchEvent(new MouseEvent("click", {bubbles: true}));
  expect(callService).not.toHaveBeenCalled();
  element.remove();
});
