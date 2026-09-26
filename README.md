# Wake Alarm with daily schedules

Independent, manually installed Home Assistant integration derived from scootaash/hass-wake-alarm at commit 3c3fcb140458d1533daa2a26104d8aef573ea4d0. Original MIT copyright and license are preserved in LICENSE. This repository is not a GitHub fork and is not registered with HACS.

Each enabled weekday has its own persistent time entity. The card displays daily time inputs and the existing day toggles. The large time control sets all seven days together; individual daily inputs change only that day. Existing entity IDs, config entry, services, music, light ramp, auto-dismiss, snooze and dismiss remain compatible.

On first installation, daily times inherit the restored common alarm time. Later restarts restore each daily setting separately. The next alarm, ramp start and startup catch-up use the time of the selected day, including ramps starting the previous evening.

## Installation and rollback

Back up the installed integration directory and its card before replacing files. Keep the existing wake_alarm config entry and entity registry; do not remove and recreate the integration. Install custom_components/wake_alarm into the Home Assistant config directory, validate configuration, and restart Home Assistant to load Python code. Update the card resource to /wake_alarm/wake-alarm-card.js?v=0.6.0 and refresh the browser.

The old HACS repository must cease managing these files before future HACS updates can overwrite them. Do not remove it through an operation that deletes the newly installed directory. No HACS registration is included for this project.

Rollback: restore the previous integration directory and card resource URL, then restart Home Assistant. Keep the config entry and original 29 entities. New daily-time entities can remain unused until removed through the supported registry API.

Deployment status and verification are recorded in docs.md. A passing build is not a live-test claim.
