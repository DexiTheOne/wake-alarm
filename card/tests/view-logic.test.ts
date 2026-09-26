import { describe, expect, it } from "vitest";
import { showsMediaControls, alarmStatusLabel, alarmBarStatus } from "../src/view-logic";

describe("showsMediaControls", () => {
  it("is true when at least one media player is configured", () => {
    expect(showsMediaControls(["media_player.bedroom"])).toBe(true);
    expect(
      showsMediaControls(["media_player.a", "media_player.b"]),
    ).toBe(true);
  });

  it("is false for a lights-only alarm (no players)", () => {
    expect(showsMediaControls([])).toBe(false);
  });

  it("is false when players is undefined", () => {
    expect(showsMediaControls(undefined)).toBe(false);
  });
});


describe("next alarm label", () => {
  it("shows an earlier one-time adjustment in HA timezone", () => {
    expect(alarmStatusLabel("2026-09-26T11:30:00Z", {timezone:"America/New_York", adjusted:true, adjusted_from:"08:40", adjusted_time:"07:30", adjustment_direction:"earlier"})).toContain("Sat, adjusted earlier from 08:40 to 07:30");
  });
  it("uses the server weekday even when UTC is on another day", () => {
    expect(alarmStatusLabel("2026-09-27T01:00:00Z", {timezone:"America/New_York"})).toContain("Sat");
  });
});


describe("alarm bar", () => {
  const attrs = {next_alarm_date: "2026-09-27", day_status: {sun: {date: "2026-09-27", enabled: true, override: null}}};
  it("uses global off before any exceptions", () => {
    expect(alarmBarStatus(false, {...attrs, adjusted: true})).toEqual({label: "Off", color: "red"});
  });
  it("shows normal and adjusted operation", () => {
    expect(alarmBarStatus(true, attrs)).toEqual({label: "On", color: "green"});
    expect(alarmBarStatus(true, {...attrs, adjusted: true, adjusted_from: "08:40", adjusted_time: "08:41"})).toEqual({label: "On", color: "blue"});
    expect(alarmBarStatus(true, {...attrs, adjusted: true, adjusted_from: "08:40", adjusted_time: "08:40"})).toEqual({label: "On", color: "green"});
  });
  it("includes a skipped occurrence before the next firing day", () => {
    expect(alarmBarStatus(true, {...attrs, day_status: {sun: {date: "2026-09-27", enabled: true, override: false}, mon: {date: "2026-09-28", enabled: true, override: null}}})).toEqual({label: "One Time Off", color: "grey"});
    expect(alarmBarStatus(true, {...attrs, day_status: {sun: {date: "2026-09-27", enabled: false, override: true}}})).toEqual({label: "One Time On", color: "blue"});
  });
  it("suppresses adjustment text when original and adjusted times match", () => {
    expect(alarmStatusLabel("2026-09-27T12:40:00Z", {...attrs, timezone: "America/New_York", adjusted: true, adjusted_from: "08:40", adjusted_time: "08:40"})).not.toContain("adjusted");
  });
});
