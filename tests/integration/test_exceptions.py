"""One-occurrence changes must not mutate or repeat the saved schedule."""

from datetime import datetime, time, timezone

import pytest
from homeassistant.exceptions import HomeAssistantError
from pytest_homeassistant_custom_component.common import async_fire_time_changed


def at(hour, minute=0):
    return datetime(2026, 5, 9, hour, minute, tzinfo=timezone.utc)


async def test_adjustment_fires_once_and_returns_to_saved_time(env, freezer):
    freezer.move_to(at(5))
    coord = await env.build(env.make_entry(), days={5})
    await coord.async_adjust_next_alarm(time(6))
    assert coord.next_fire == at(6)
    assert coord.schedule_attributes["adjusted"] is True
    assert env.hass.states.get("time.test_alarm_time").state == "07:00:00"
    freezer.move_to(at(6))
    async_fire_time_changed(env.hass)
    await env.hass.async_block_till_done()
    assert coord._override is None
    assert coord.next_fire.day == 16
    assert coord.next_fire.hour == 7
    freezer.move_to(at(7))
    async_fire_time_changed(env.hass)
    await env.hass.async_block_till_done()
    assert coord.next_fire.day == 16


async def test_later_adjustment_suppresses_regular_time(env, freezer):
    freezer.move_to(at(5))
    coord = await env.build(env.make_entry(), days={5})
    await coord.async_adjust_next_alarm(time(8))
    freezer.move_to(at(7))
    async_fire_time_changed(env.hass)
    await env.hass.async_block_till_done()
    assert coord.state == "idle"
    assert coord.next_fire == at(8)


async def test_adjustment_and_consumed_occurrence_survive_reload(env, freezer):
    freezer.move_to(at(5))
    entry = env.make_entry()
    coord = await env.build(entry, days={5})
    await coord.async_adjust_next_alarm(time(6))
    await coord.async_unload()
    restored = await env.build(entry, days={5})
    assert restored.next_fire == at(6)
    freezer.move_to(at(6))
    async_fire_time_changed(env.hass)
    await env.hass.async_block_till_done()
    await restored.async_unload()
    restarted = await env.build(entry, days={5})
    assert restarted.next_fire.day == 16
    assert restarted.next_fire.hour == 7


async def test_reject_past_and_stale_adjustments(env, freezer):
    freezer.move_to(at(5))
    coord = await env.build(env.make_entry(), days={5})
    with pytest.raises(HomeAssistantError):
        await coord.async_adjust_next_alarm(time(4))
    with pytest.raises(HomeAssistantError):
        await coord.async_adjust_next_alarm(time(6), "2026-05-10")
    assert coord.next_fire == at(7)
    assert coord._override is None


async def test_disable_once_preserves_switch_and_returns_next_week(env, freezer):
    freezer.move_to(at(5))
    coord = await env.build(env.make_entry(), days={5})
    await coord.async_toggle_day_once("sat")
    assert env.hass.states.get("switch.test_d6_sat").state == "on"
    assert coord.schedule_attributes["day_status"]["sat"]["override"] is False
    assert coord.next_fire.day == 16
    await coord.async_toggle_day_once("sat")
    assert coord.next_fire == at(7)
    assert coord.schedule_attributes["day_status"]["sat"]["override"] is None


async def test_enable_once_with_all_recurring_days_off(env, freezer):
    freezer.move_to(at(5))
    coord = await env.build(env.make_entry(), days=set())
    assert coord.next_fire is None
    await coord.async_toggle_day_once("sat")
    assert coord.next_fire == at(7)
    assert env.hass.states.get("switch.test_d6_sat").state == "off"
    assert coord.schedule_attributes["day_status"]["sat"]["override"] is True
    freezer.move_to(at(7))
    async_fire_time_changed(env.hass)
    await env.hass.async_block_till_done()
    assert coord.next_fire is None


async def test_weekday_exception_survives_reload(env, freezer):
    freezer.move_to(at(5))
    entry = env.make_entry()
    coord = await env.build(entry, days={5})
    await coord.async_toggle_day_once("sat")
    await coord.async_unload()
    restored = await env.build(entry, days={5})
    assert restored.next_fire.day == 16
    assert restored.schedule_attributes["day_status"]["sat"]["override"] is False


async def test_dismiss_cross_midnight_ramp_consumes_correct_day(env, freezer):
    freezer.move_to(datetime(2026, 5, 8, 23, 40, tzinfo=timezone.utc))
    coord = await env.build(env.make_entry(), days={5}, alarm_time="00:05:00")
    coord._state = "ramping"
    coord._active_occurrence_date = "2026-05-09"
    await coord.async_dismiss()
    assert coord.next_fire.day == 16


async def test_duplicate_alarm_callback_does_not_repeat_music(env, freezer):
    freezer.move_to(at(5))
    coord = await env.build(env.make_entry(), days={5})
    freezer.move_to(at(7))
    coord._cancel_scheduled_timers()
    await coord._async_on_alarm(at(7))
    await env.hass.async_block_till_done()
    await coord._async_on_alarm(at(7))
    await env.hass.async_block_till_done()
    assert env.music.calls == 1


async def test_adjustment_starts_remaining_ramp_window(env, freezer):
    freezer.move_to(at(5))
    coord = await env.build(env.make_entry(), days={5})
    await coord.async_adjust_next_alarm(time(5, 10))
    await env.hass.async_block_till_done()
    assert env.ramp.calls == 1
    assert coord.next_fire == at(5, 10)


async def test_stopping_test_music_does_not_skip_real_alarm(env, freezer):
    freezer.move_to(at(5))
    coord = await env.build(env.make_entry(), days={5})
    env.music.block()
    await coord.async_test_music()
    await env.music.started.wait()
    await coord.async_dismiss()
    env.music.release()
    await env.hass.async_block_till_done()
    assert coord.next_fire == at(7)
    assert coord._consumed_date is None


async def test_adjustment_targets_skipped_occurrence(env, freezer):
    freezer.move_to(at(5))
    entry = env.make_entry()
    coord = await env.build(entry, days={5, 6})
    await coord.async_toggle_day_once("sat")
    assert coord.next_fire.day == 10
    assert coord.schedule_attributes["card_alarm"]["next_alarm_date"] == "2026-05-09"
    await coord.async_adjust_next_alarm(time(6, 50), "2026-05-09")
    assert coord.next_fire.day == 10
    selected = coord.schedule_attributes["card_alarm"]
    assert selected["next_alarm_time"] == "06:50:00"
    assert selected["adjusted_from"] == "07:00"
    assert env.hass.states.get("time.test_alarm_time").state == "07:00:00"
    await coord.async_unload()
    restored = await env.build(entry, days={5, 6})
    assert restored.schedule_attributes["card_alarm"]["next_alarm_time"] == "06:50:00"
    assert restored.next_fire.day == 10
    await restored.async_toggle_day_once("sat")
    assert restored.next_fire == at(6, 50)
    await restored.async_adjust_next_alarm(time(7), "2026-05-09")
    assert restored._override is None
    assert restored.schedule_attributes["card_alarm"]["adjusted"] is False
