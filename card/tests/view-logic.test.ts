import { describe, expect, it } from "vitest";
import { showsMediaControls, alarmStatusLabel } from "../src/view-logic";

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
