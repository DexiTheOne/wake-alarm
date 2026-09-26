# Verification record

## 2026-09-26

Independent daily-schedule implementation built from upstream commit 3c3fcb140458d1533daa2a26104d8aef573ea4d0, preserving the MIT license and existing integration domain, entities and service interfaces. HACS installation enabled after the user revised the initial no-HACS preference.

Changes: seven persistent daily time entities; shared control sets all days; daily inputs change one day; next-alarm, ramp and startup catch-up calculations use the selected weekday time. Existing music, snooze, dismiss and auto-dismiss code retained.

Validation: 31 scheduling tests pass locally; 15 card tests, type check, production build and Python lint pass. GitHub Actions run 36223088735 passes 125 integration tests on each of two HA versions, plus card and lint jobs. Relevant source/configuration was inspected through Home Assistant MCP, and a live configuration check passed. A full live backup was created before replacing any installed files.

Status: built and synchronized; not deployed or live-verified yet. HACS receives GitHub 404 for the private repository. Awaiting public visibility authorization or HACS access. The existing live alarm remains unchanged.

Rollback after deployment: uninstall this HACS download, reinstall the original integration, retain the original Home Assistant config entry and entity registry, restore the prior card resource, and restart. Local patches are preserved in the private pre-change backup. A full backup restore would require explicit user approval and the configured backup encryption key. Private deployment details and device-state snapshots are intentionally excluded from this repository.
