let timerId = null;
let elapsedSeconds = 0;
let callbackFn = null;

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

export function getCurrentTime() {
    return formatTime(elapsedSeconds);
}

export function startTimer(callback) {
    stopTimer();
    callbackFn = callback || null;
    timerId = window.setInterval(() => {
        elapsedSeconds += 1;
        if (callbackFn) {
            callbackFn(getCurrentTime());
        }
    }, 1000);
    if (callbackFn) {
        callbackFn(getCurrentTime());
    }
}

export function stopTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
}

export function resetTimer() {
    stopTimer();
    elapsedSeconds = 0;
    if (callbackFn) {
        callbackFn(getCurrentTime());
    }
}
