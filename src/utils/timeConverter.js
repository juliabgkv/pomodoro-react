export function msToTime(ms) {
    const seconds = (ms / 1000);

    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return {
        minutes: min,
        seconds: sec
    };
}

export function timeStringify(time) {
    const m = time.minutes < 10 ? ('0' + time.minutes) : time.minutes;
    const s = time.seconds < 10 ? ('0' + time.seconds) : time.seconds;
    
    return `${m}:${s}`;
}

export function msToTimeString(ms) {
    const time = msToTime(ms);
    return timeStringify(time);
}