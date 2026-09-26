"""Full config-entry setup/teardown smoke test.

Unlike the coordinator tests (which drive the state machine directly), this
runs the real ``config_entries.async_setup`` path end-to-end, including
``_async_register_card``. That path used to be broken by #19 (duplicate static
route on concurrent setup) and #20 (blocking ``open()`` of manifest.json); both
are now fixed, so this is a real passing gate. The card registration calls
``add_extra_js_url``, so it depends on the ``card_frontend`` fixture (which
provides ``http`` + the frontend data store — see the integration conftest).

This drives the real config-entry setup, which imports ``config_flow``; that
module uses ``ConfigFlowResult`` (HA 2024.4+), so the test is skipped on older
cores where the integration's config flow can't be imported at all. The #19/#20
regressions themselves are gated by ``test_card_registration.py``, which runs on
every supported core.
"""

from __future__ import annotations

import homeassistant.config_entries as _config_entries
import pytest
from homeassistant.const import CONF_NAME
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.wake_alarm.const import (
    CONF_LIGHT_ENTITIES,
    CONF_MEDIA_PLAYER_ENTITIES,
    CONF_NOTIFY_TARGET_STANDARD,
    CONF_NOTIFY_TARGET_URGENT,
    CONF_SLUG,
    DAYS,
    DOMAIN,
)

_HAS_CONFIG_FLOW_RESULT = hasattr(_config_entries, "ConfigFlowResult")


@pytest.mark.skipif(
    not _HAS_CONFIG_FLOW_RESULT,
    reason="integration config_flow requires ConfigFlowResult (HA 2024.4+)",
)
async def test_full_entry_setup_and_unload(hass, card_frontend) -> None:
    """The entry sets up its platforms and unloads cleanly."""
    # card_frontend provides http + the add_extra_js_url data store the card
    # registration needs (the real frontend component can't run under PHACC).
    entry = MockConfigEntry(
        domain=DOMAIN,
        version=2,
        unique_id="smoke",
        data={
            CONF_NAME: "Smoke",
            CONF_SLUG: "smoke",
            CONF_LIGHT_ENTITIES: ["light.bedroom"],
            CONF_MEDIA_PLAYER_ENTITIES: ["media_player.bedroom"],
            CONF_NOTIFY_TARGET_STANDARD: "notify.mobile",
            CONF_NOTIFY_TARGET_URGENT: "notify.mobile",
        },
    )
    entry.add_to_hass(hass)

    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    coordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]
    assert coordinator is not None
    # The enable switch should have been created by the switch platform.
    assert hass.states.get("switch.smoke_enabled") is not None

    # The common control sets all days; a daily control preserves its siblings.
    await hass.services.async_call(
        "switch", "turn_off", {"entity_id": "switch.smoke_enabled"}, blocking=True
    )
    for day in DAYS:
        assert hass.states.get(f"time.smoke_alarm_time_{day}").state == "07:00:00"
    await hass.services.async_call(
        "time",
        "set_value",
        {"entity_id": "time.smoke_alarm_time", "time": "08:40:00"},
        blocking=True,
    )
    for day in DAYS:
        assert hass.states.get(f"time.smoke_alarm_time_{day}").state == "08:40:00"
    await hass.services.async_call(
        "time",
        "set_value",
        {"entity_id": "time.smoke_alarm_time_d1_mon", "time": "06:30:00"},
        blocking=True,
    )
    assert hass.states.get("time.smoke_alarm_time_d1_mon").state == "06:30:00"
    assert hass.states.get("time.smoke_alarm_time_d2_tue").state == "08:40:00"
    assert hass.states.get("time.smoke_alarm_time").state == "08:40:00"

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
