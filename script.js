let minutes;
let seconds;
let timerInterval;
let mode;
let isRunning = false;

const pomodoroTab = document.getElementById('pomodoro-tab');
const shortBreakTab = document.getElementById('short-break-tab');
const longBreakTab = document.getElementById('long-break-tab');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const incMinutesButton = document.getElementById('inc-minutes');
const decMinutesButton = document.getElementById('dec-minutes');
const incSecondsButton = document.getElementById('inc-seconds');
const decSecondsButton = document.getElementById('dec-seconds');

function setMode(newMode) {
    mode = newMode;

    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));

    if (mode === 'pomodoro') {
        pomodoroTab.classList.add('active');
        minutes = 25;
        seconds = 0;
        document.body.style.background = "#AD504D"
        startStopButton.style.color = "#AD504D"
        resetButton.style.color = "#AD504D"
    } else if (mode === 'short-break') {
        shortBreakTab.classList.add('active');
        minutes = 5;
        seconds = 0;
        document.body.style.background = "#4D8389"
        startStopButton.style.color = "#4D8389"
        resetButton.style.color = "#4D8389"
    } else if (mode === 'long-break') {
        longBreakTab.classList.add('active');
        minutes = 15;
        seconds = 0;
        document.body.style.background = "#476F94"
        startStopButton.style.color = "#476F94"
        resetButton.style.color = "#476F94"
    }

    updateDisplay();
    clearInterval(timerInterval);
    startStopButton.textContent = 'START';
    setButtonsDisabled(false);
    isRunning = false;
}

function updateDisplay() {
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timerInterval);
                alert('Completed!!!');
                resetTimer();
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function setButtonsDisabled(disabled) {
    incMinutesButton.disabled = disabled;
    decMinutesButton.disabled = disabled;
    incSecondsButton.disabled = disabled;
    decSecondsButton.disabled = disabled;
}

function toggleStartStop() {
    if (isRunning) {
        stopTimer();
        startStopButton.textContent = 'START';
        setButtonsDisabled(false);
    } else {
        startTimer();
        startStopButton.textContent = 'STOP';
        setButtonsDisabled(true);
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startStopButton.textContent = 'START';
    if (mode === 'pomodoro') {
        minutes = 25;
        seconds = 0;
    } else if (mode === 'short-break') {
        minutes = 5;
        seconds = 0;
    } else if (mode === 'long-break') {
        minutes = 15;
        seconds = 0;
    }
    updateDisplay();
    setButtonsDisabled(false);
}

// Increment/Decrement time
function incrementMinutes() {
    minutes = Math.min(minutes + 1, 60);
    updateDisplay();
}

function decrementMinutes() {
    minutes = Math.max(minutes - 1, 0);
    updateDisplay();
}

function incrementSeconds() {
    seconds = (seconds + 1) % 60;
    if (seconds === 0 && minutes < 60) {
        minutes++;
    }
    updateDisplay();
}

function decrementSeconds() {
    if (seconds === 0 && minutes > 0) {
        minutes--;
        seconds = 59;
    } else {
        seconds = Math.max(seconds - 1, 0);
    }
    updateDisplay();
}

// Event listeners for tab buttons
pomodoroTab.addEventListener('click', () => setMode('pomodoro'));
shortBreakTab.addEventListener('click', () => setMode('short-break'));
longBreakTab.addEventListener('click', () => setMode('long-break'));

// Event listeners for increment and decrement buttons
incMinutesButton.addEventListener('click', incrementMinutes);
decMinutesButton.addEventListener('click', decrementMinutes);
incSecondsButton.addEventListener('click', incrementSeconds);
decSecondsButton.addEventListener('click', decrementSeconds);

// Event listeners for start/stop and reset
startStopButton.addEventListener('click', toggleStartStop);
resetButton.addEventListener('click', resetTimer);

// Initialize the mode
setMode("pomodoro");
