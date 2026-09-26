// @vitest-environment happy-dom
import { describe, expect, it, vi } from "vitest";

describe("card registration", () => {
  it("finishes when a child element was already registered by another loader", async () => {
    class ExistingView extends HTMLElement {}
    customElements.define("wake-alarm-main-view", ExistingView);
    await import("../src/wake-alarm-card");
    expect(customElements.get("wake-alarm-main-view")).toBe(ExistingView);
    expect(customElements.get("wake-alarm-card")).toBeDefined();
    const card = document.createElement("wake-alarm-card");
    expect(typeof (card as any).setConfig).toBe("function");
  });
  it("permits a second bundle load without duplicating elements or picker entries", async () => {
    const original = customElements.get("wake-alarm-card");
    vi.resetModules();
    await import("../src/wake-alarm-card");
    expect(customElements.get("wake-alarm-card")).toBe(original);
    expect(window.customCards?.filter((card) => card.type === "wake-alarm-card")).toHaveLength(1);
  });
});
