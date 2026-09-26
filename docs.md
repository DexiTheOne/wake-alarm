# Verification record

## Release 0.7.1

Seven persistent daily time controls and recurring weekday switches are available. The card supports persistent one-time time and day exceptions. Integration identity and existing service interfaces are preserved.

Validation: CI run 36225080777 passes 139 Python tests on each of two Home Assistant matrices, 19 card tests, type checking, production build, and lint. Metadata validation also passes. Production-bundle DOM tests cover pre-existing child elements and duplicate imports with one picker entry.

Live functional checks passed for independent daily changes, one-time adjustment persistence across reload, clearing overrides, past-time rejection, and temporary day enable/disable without changing recurring settings. Controlled execution demonstrated light ramp, ramp cancellation preserving the alarm, scheduled playback, snooze pause/resume, automatic stop, and explicit dismissal. Temporary tests were removed afterward.

Release 0.7.1 was deployed through HACS and read back after restart. The exact production bundle is served with JavaScript content type. The user confirmed the card displays in Safari and Firefox after the native duplicate-registration fix.

Rollback: reinstall the previous release while retaining the existing integration configuration and entity registry, restore its card resource version, and restart.


## Release 0.7.2

Replaced early frontend loading with one automatically managed dashboard module resource. The resource collection API preserves the existing resource identity during upgrades. The loader waits for Home Assistant registration before importing Lit, avoiding Firefox scoped-registry replacement discarding early card registrations.

Live Firefox diagnosis reproduced missing registrations after early loading and immediate recovery when importing after frontend readiness. Following HACS deployment and restart, ordinary reload and full refresh both displayed the card and its weekday times. Browser readback confirmed both card and child view registered and only the versioned loader and bundle fetched. Dashboard resource migration occurred automatically. Configuration validation and backend readback passed; existing alarm settings were preserved.

CI run 36259802321 passed both Home Assistant matrices, lint, card type check, 20 card tests, and build. Metadata validation passed. Rollback to 0.7.1 is available through HACS while retaining configuration and entity registry.

## Release 0.7.3

Status-bar dimensions and content positions stay stable across on/off states. The bar clears an adjusted time before toggling global enable. Returning the picker to its original time clears the stored adjustment. Removed the adjustment heading and separate reset button; added Off/On/One Time Off/One Time On labels with red/green/grey/blue icons. Active-alarm tap guard retained. Card type check, production build, and 28 tests passed. Deployment verification is recorded after live checks. Rollback: install 0.7.2 through HACS and restore its card resource URL.
