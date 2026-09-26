import { readFileSync } from 'node:fs';
import { expect, it, vi } from 'vitest';

it('imports nothing until HA initializes its final registry, then loads the versioned bundle', () => {
  vi.useFakeTimers();
  let registryReady = false;
  const load = vi.fn(() => Promise.resolve());
  const source = readFileSync(new URL('../loader.js', import.meta.url), 'utf8')
    .replace('import.meta.url', JSON.stringify('http://localhost/wake_alarm/wake-alarm-card.js'))
    .replace('import(bundle.href)', 'load(bundle.href)');
  const registry = {get: () => registryReady ? class {} : undefined};
  new Function('customElements', 'load', source)(registry, load);
  vi.advanceTimersByTime(500);
  expect(load).not.toHaveBeenCalled();
  registryReady = true;
  vi.advanceTimersByTime(50);
  expect(load).toHaveBeenCalledWith('http://localhost/wake_alarm/wake-alarm-card-bundle.js?v=0.7.5');
  expect(load).toHaveBeenCalledTimes(1);
  vi.useRealTimers();
});
