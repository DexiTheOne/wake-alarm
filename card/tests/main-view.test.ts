// @vitest-environment happy-dom
import { describe, expect, it, vi } from "vitest";
import { WakeAlarmMainView } from "../src/main-view";

function view(adjusted = false, fsm = "idle") {
  const element = new WakeAlarmMainView();
  const callService = vi.fn().mockResolvedValue(undefined);
  element.related = {enabled: "switch.alarm", sensors: {state: "sensor.state", next_alarm: "sensor.next"}} as any;
  element.hass = {callService, states: {
    "sensor.state": {state: fsm},
    "sensor.next": {attributes: {adjusted, adjusted_from: "08:40", next_alarm_time: "08:41:00", next_alarm_date: "2026-09-27"}},
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
  it("toggles global enable when there is no adjustment", () => {
    const {element, callService} = view();
    element._handleModeTileClick();
    expect(callService).toHaveBeenCalledTimes(1);
    expect(callService).toHaveBeenCalledWith("switch", "toggle", {entity_id: "switch.alarm"});
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
