# Wake Alarm with daily schedules

Independent, HACS-installed Home Assistant integration derived from scootaash/hass-wake-alarm at commit 3c3fcb140458d1533daa2a26104d8aef573ea4d0. Original MIT copyright and license are preserved in LICENSE. This repository is not a GitHub fork and can be installed as a HACS custom repository.

Each enabled weekday has its own persistent time entity. The card displays each saved time under its weekday. Its large time control adjusts only the next occurrence; the status box labels that adjustment. Daily settings and recurring day switches are editable on the integration device and read-only in card settings. The all-days time control has been removed to prevent accidental schedule overwrites. Daily controls are paired in Monday-through-Sunday display-name order. Existing daily entity IDs, config entry, services, music, light ramp, auto-dismiss, snooze and dismiss remain compatible.

New installations default each daily time to 07:00. Upgrades from daily-schedule releases and later restarts restore each daily setting separately. The next alarm, ramp start and startup catch-up use the time of the selected day, including ramps starting the previous evening.

## Installation and rollback

Add DexiTheOne/wake-alarm as an Integration in HACS custom repositories, then download it. When replacing the original, remove the original HACS installation first, without deleting the Home Assistant config entry.

Back up the installed integration directory and its card before replacing files. Keep the existing wake_alarm config entry and entity registry; do not remove and recreate the integration. Install custom_components/wake_alarm into the Home Assistant config directory, validate configuration, and restart Home Assistant to load Python code. The integration registers or updates /wake_alarm/wake-alarm-card.js?v=0.7.5 as a dashboard module automatically. Refresh the browser after an update. YAML resource configurations must include that module explicitly.

The old HACS repository must cease managing these files before future HACS updates can overwrite them. Do not remove it through an operation that deletes the newly installed directory. HACS support was enabled at the user's request.

Rollback: restore the previous integration directory and card resource URL, then restart Home Assistant. Keep the config entry and remaining entities. New daily-time entities can remain unused until removed through the supported registry API.

Deployment status and verification are recorded in docs.md. A passing build is not a live-test claim.


## One-time changes

Main-card day colors: grey means recurring off, green recurring on, blue enabled once, red disabled once. Clicking a day creates an exception for its next occurrence; clicking again removes it. Integration/device switches always control the recurring weekday setting.

Next-alarm time adjustments and day exceptions survive restarts. Adjustments in the past are rejected, and fired/dismissed occurrences are recorded to prevent firing again at the original time. The per-day settings stay unchanged by card adjustments. Tap the top status bar to clear a time adjustment. Without an adjustment, the bar toggles only the next occurrence. The card never writes the recurring daily times, weekday switches, or global enable switch. Returning the time picker to its original time also clears the adjustment.
