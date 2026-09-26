# Verification record

## Release 0.7.1

Seven persistent daily time controls and recurring weekday switches are available. The card supports persistent one-time time and day exceptions. Integration identity and existing service interfaces are preserved.

Validation: CI run 36225080777 passes 139 Python tests on each of two Home Assistant matrices, 19 card tests, type checking, production build, and lint. Metadata validation also passes. Production-bundle DOM tests cover pre-existing child elements and duplicate imports with one picker entry.

Live functional checks passed for independent daily changes, one-time adjustment persistence across reload, clearing overrides, past-time rejection, and temporary day enable/disable without changing recurring settings. Controlled execution demonstrated light ramp, ramp cancellation preserving the alarm, scheduled playback, snooze pause/resume, automatic stop, and explicit dismissal. Temporary tests were removed afterward.

Release 0.7.1 was deployed through HACS and read back after restart. The exact production bundle is served with JavaScript content type. The user confirmed the card displays in Safari and Firefox after the native duplicate-registration fix.

Rollback: reinstall the previous release while retaining the existing integration configuration and entity registry, restore its card resource version, and restart.
