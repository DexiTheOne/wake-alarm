# Verification record

## 2026-09-26

Independent public repository, preserving upstream MIT licensing and existing integration identity. Version 0.7.0 installed through HACS and configuration validated. Seven daily time entities initialized from the restored common time; all original entities retained.

Live MCP checks passed: daily time changes affected only the selected day; a one-time time adjustment survived an integration reload; clearing it restored the recurring schedule. Past adjustments were rejected. Temporary weekday disable/enable states changed the next occurrence without changing the recurring switch and could be cleared.

An isolated temporary integration demonstrated scheduled light ramp, cancellation without cancelling the alarm, scheduled muted playback, snooze pause and timed resume. Auto-dismiss and final restoration are being checked before completion.

Version 0.7.0 passed both Home Assistant CI matrices and card tests. Version 0.7.1 adds idempotent custom-element registration after a Firefox duplicate-registration report. Card type check, production build and 19 tests pass locally, including partial and repeated registration cases. Browser visual confirmation is delegated to the user; Safari is reported working. Deployment and live readback of 0.7.1 remain pending.

Rollback: reinstall the original HACS integration without deleting the existing config entry or entity registry; restore the prior resource URL and restart. A private pre-installation full backup includes the previous local Firefox patch. Full restore requires explicit approval and the configured backup encryption key. Private device settings and credentials are not published.
