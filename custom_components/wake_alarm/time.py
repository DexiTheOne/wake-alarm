"""Independent daily wake-alarm time entities."""

from __future__ import annotations

from datetime import time as dt_time

from homeassistant.components.time import TimeEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import EntityCategory
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.restore_state import RestoreEntity

from .const import DAYS
from .entity import WakeAlarmEntity

DAY_NAMES = ("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    async_add_entities([WakeAlarmDailyTime(entry, day) for day in DAYS])


class WakeAlarmDailyTime(WakeAlarmEntity, TimeEntity, RestoreEntity):
    """Restore each day's time independently; no all-days write control."""

    _attr_entity_category = EntityCategory.CONFIG

    def __init__(self, entry: ConfigEntry, day: str) -> None:
        super().__init__(entry, key=f"alarm_time_{day}", platform="time")
        index = DAYS.index(day)
        self._attr_name = f"{index + 1} {DAY_NAMES[index]} 2 Time"
        self._attr_native_value = dt_time(7, 0)

    async def async_added_to_hass(self) -> None:
        await super().async_added_to_hass()
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
