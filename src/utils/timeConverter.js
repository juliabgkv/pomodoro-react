function msToTime(ms) {
  const seconds = ms / 1000;

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return {
    minutes: min,
    seconds: sec,
  };
}

function timeStringify(time) {
  const m = time.minutes < 10 ? "0" + time.minutes : time.minutes;
  const s = time.seconds < 10 ? "0" + time.seconds : time.seconds;

  return `${m}:${s}`;
}

function minToMs(min) {
  return min * 60 * 1000;
}

export function msToTimeString(ms) {
  const time = msToTime(ms);
  return timeStringify(time);
}

export function convertMsTimersToMinutes(timers) {
  const minutesTimer = {};
  Object.keys(timers).forEach((key) => {
    minutesTimer[key] = msToTime(timers[key]).minutes;
  });

  return minutesTimer;
}

export function convertMinutesTimerToMs(timers) {
  const msTimers = {};
  Object.keys(timers).forEach((key) => {
    msTimers[key] = minToMs(timers[key]);
  });

  return msTimers;
}
