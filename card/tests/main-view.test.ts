// @vitest-environment happy-dom
import { describe, expect, it, vi } from "vitest";
import { WakeAlarmMainView } from "../src/main-view";

function view(adjusted = false, fsm = "idle") {
  const element = new WakeAlarmMainView();
  const callService = vi.fn().mockResolvedValue(undefined);
  element.related = {enabled: "switch.alarm", sensors: {state: "sensor.state", next_alarm: "sensor.next"}} as any;
  element.hass = {callService, states: {
    "switch.alarm": {state: "on"},
    "sensor.state": {state: fsm},
    "sensor.next": {attributes: {adjusted, adjusted_from: "08:40", next_alarm_time: "08:41:00", next_alarm_date: "2026-09-27", day_status: {sun: {date: "2026-09-27", enabled: true, override: null}}}},
  }} as any;
  return {element: element as any, callService};
}

describe("main view actions", () => {
  it("resets an adjustment from the bar without toggling global enable", async () => {
    const {element, callService} = view(true);
    element._handleModeTileClick();
    await Promise.resolve();
    expect(callService).toHaveBeenCalledTimes(1);
    expect(callService).toHaveBeenCalledWith("wake_alarm", "clear_adjustment", {entity_id: "switch.alarm"});
  });
  it("toggles only the next occurrence when there is no adjustment", () => {
    const {element, callService} = view();
    element._handleModeTileClick();
    expect(callService).toHaveBeenCalledTimes(1);
    expect(callService).toHaveBeenCalledWith("wake_alarm", "toggle_day_once", {entity_id: "switch.alarm", day: "sun"});
  });
  it("clears the stored adjustment when moving back to the original minute", async () => {
    const {element, callService} = view(true);
    await element._adjustTime(0, -1);
    expect(callService).toHaveBeenCalledTimes(1);
    expect(callService).toHaveBeenCalledWith("wake_alarm", "clear_adjustment", {entity_id: "switch.alarm"});
  });
  it("preserves the active alarm guard", () => {
    const {element, callService} = view(true, "playing");
    element._handleModeTileClick();
    expect(callService).not.toHaveBeenCalled();
  });
});

it("does nothing when globally off, including a pending adjustment", () => {
  const {element, callService} = view(true);
  element.hass.states["switch.alarm"].state = "off";
  element._handleModeTileClick();
  expect(callService).not.toHaveBeenCalled();
});
it("adjusts the selected skipped Sunday instead of the next firing Monday", async () => {
  const {element, callService} = view();
  element.hass.states["sensor.next"].attributes = {
    next_alarm_date: "2026-09-28", next_alarm_time: "09:00:00",
    card_alarm: {next_alarm_date: "2026-09-27", next_alarm_time: "08:40:00", adjusted: false},
  };
  await element._adjustTime(0, 1);
  expect(callService).toHaveBeenCalledWith("wake_alarm", "adjust_next_alarm", {entity_id: "switch.alarm", time: "08:41:00", expected_date: "2026-09-27"});
});
