"""Wake Alarm time-of-day entity."""

from __future__ import annotations

import asyncio
from datetime import time as dt_time

from homeassistant.components.time import TimeEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import EntityCategory
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.restore_state import RestoreEntity

from .const import CONF_SLUG, DAYS
from .entity import WakeAlarmEntity


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    common = WakeAlarmAlarmTime(entry)
    async_add_entities(
        [common, *(WakeAlarmDailyTime(entry, day, common) for day in DAYS)]
    )


class WakeAlarmAlarmTime(WakeAlarmEntity, TimeEntity, RestoreEntity):
    """Alarm time-of-day. 24-hour, no seconds in UI but stored to second precision."""

    _attr_translation_key = "alarm_time"
    _attr_entity_category = EntityCategory.CONFIG

    def __init__(self, entry: ConfigEntry) -> None:
        super().__init__(entry, key="alarm_time", platform="time")
        self._attr_native_value = dt_time(7, 0)
        self.restored = asyncio.Event()

    async def async_added_to_hass(self) -> None:
        await super().async_added_to_hass()
        await self._restore_time()
        self.restored.set()

    async def _restore_time(self) -> None:
        last_state = await self.async_get_last_state()
        if last_state is None or last_state.state in (None, "unknown", "unavailable"):
            return
        try:
            self._attr_native_value = dt_time.fromisoformat(last_state.state)
        except ValueError:
            pass

    async def async_set_value(self, value: dt_time) -> None:
        self._attr_native_value = value
        self.async_write_ha_state()
        for day in DAYS:
            entity_id = f"time.{self._entry.data[CONF_SLUG]}_alarm_time_{day}"
            if self.hass.states.get(entity_id) is not None:
                await self.hass.services.async_call(
                    "time",
                    "set_value",
                    {"entity_id": entity_id, "time": value.isoformat()},
                    blocking=True,
                )


class WakeAlarmDailyTime(WakeAlarmAlarmTime):
    """Independent daily time, initially inherited from the existing alarm."""

    _attr_translation_key = None

    def __init__(
        self, entry: ConfigEntry, day: str, common: WakeAlarmAlarmTime
    ) -> None:
        WakeAlarmEntity.__init__(self, entry, key=f"alarm_time_{day}", platform="time")
        self.common = common
        self._attr_name = f"Alarm time {day.split('_')[-1].title()}"
        self._attr_native_value = dt_time(7, 0)

    async def async_added_to_hass(self) -> None:
        await WakeAlarmEntity.async_added_to_hass(self)
        await self.common.restored.wait()
        self._attr_native_value = self.common.native_value
        await self._restore_time()

    async def async_set_value(self, value: dt_time) -> None:
        self._attr_native_value = value
        self.async_write_ha_state()
