//Note I WROTE the comments and organized the content. Don't go and think it was chatgpt. I am not that dumb 
const themeButtons = document.querySelectorAll('.theme-btn');
const body = document.body;
const clockDisplay = document.querySelector('.clock-display');
const dateDisplay = document.getElementById('date');
const alarmSound = document.getElementById('alarmSound');

// Alarm Elements
const setAlarmBtn = document.getElementById('setAlarm');
const hrsSelect = document.getElementById('hrs');
const minsSelect = document.getElementById('minutes');
const ampmSelect = document.getElementById('ampm');
const alarmList = document.getElementById('alarmList');

// Stopwatch Elements
const stopwatchDisplay = document.querySelector('.stopwatch-display');
const startStopwatchBtn = document.getElementById('startStopwatch');
const pauseStopwatchBtn = document.getElementById('pauseStopwatch');
const resetStopwatchBtn = document.getElementById('resetStopwatch');

// Countdown Elements
const countdownInput = document.getElementById('countdownInput');
const countdownDisplay = document.getElementById('countdownDisplay');
const progressBar = document.getElementById('progressBar');
const startCountdownBtn = document.getElementById('startCountdown');
const pauseCountdownBtn = document.getElementById('pauseCountdown');
const resetCountdownBtn = document.getElementById('resetCountdown');

// Global Variables
let alarms = [];
let stopwatchInterval;
let stopwatchTime = 0;
let stopwatchRunning = false;
let countdownInterval;
let countdownTime = 0;
let countdownRunning = false;
let originalCountdownTime = 0;

// Initialize the application
function init() {
    updateClock();
    updateDate();
    setInterval(updateClock, 1000);
    
    setupEventListeners();
}

//settin up all eventlistenrs
function setupEventListeners() {
    // Theme switching
    themeButtons.forEach(button => {
        button.addEventListener('click', switchTheme);
    });

    // Alarm fns
    setAlarmBtn.addEventListener('click', setAlarm);
    document.addEventListener('keypress', handleKeyPress);

    // Stopwatch 
    startStopwatchBtn.addEventListener('click', startStopwatch);
    pauseStopwatchBtn.addEventListener('click', pauseStopwatch);
    resetStopwatchBtn.addEventListener('click', resetStopwatch);

    // Countdown controls
    startCountdownBtn.addEventListener('click', startCountdown);
    pauseCountdownBtn.addEventListener('click', pauseCountdown);
    resetCountdownBtn.addEventListener('click', resetCountdown);
}

// Theme 
function switchTheme(e) {
    const theme = e.target.dataset.theme;
    body.className = `${theme}-theme`;
    
    // Special effects for neon theme
    if (theme === 'neon') {
        clockDisplay.classList.add('glow');
    } else {
        clockDisplay.classList.remove('glow');
    }
}

// Clock 
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Converting to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    hours = String(hours).padStart(2, '0');
    
    // Add blinking effect to colon
    const colon = now.getSeconds() % 2 === 0 ? ':' : ' ';
    
    clockDisplay.value = `${hours}${colon}${minutes}${colon}${seconds} ${ampm}`;
    
    // Check if any alarms should trigger
    checkAlarms(`${hours}:${minutes} ${ampm}`);
}

function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.value = now.toLocaleDateString(undefined, options);
}

// Alarm Functions
function checkAlarms(currentTime) {
    alarms.forEach(alarm => {
        const alarmTime = `${alarm.time} ${alarm.ampm}`;
        if (alarmTime === currentTime && !alarm.triggered) {
            triggerAlarm(alarm);
        }
    });
}

function triggerAlarm(alarm) {
    // Mark alarm as triggered
    alarm.triggered = true;
    
    // Play alarm sound
    alarmSound.play();
    
    // Visual feedback
    clockDisplay.classList.add('shake');
    
    // Show alert with snooze option
    if (confirm('ALARM!\n\nClick OK to stop or Cancel to snooze for 5 minutes.')) {
        stopAlarm();
    } else {
        snoozeAlarm();
    }
}

function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    clockDisplay.classList.remove('shake');
}

function snoozeAlarm() {
    stopAlarm();
    
    const now = new Date();
    const snoozeTime = new Date(now.getTime() + 5 * 60000); // 5 minutes from now
    
    const hours = snoozeTime.getHours();
    const minutes = String(snoozeTime.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    const formattedTime = `${String(hours12).padStart(2, '0')}:${minutes}`;
    
    // Add snooze alarm
    alarms.push({
        time: formattedTime,
        ampm: ampm,
        triggered: false
    });
    
    displayAlarms();
}

function setAlarm() {
    const hours = hrsSelect.value;
    const minutes = minsSelect.value;
    const ampm = ampmSelect.value === '1' ? 'AM' : 'PM';
    
    // Validate input
    if (hours === '0' && minutes === '00') {
        alert('Please set a valid alarm time.');
        return;
    }
    
    // Check for duplicate alarm
    const alarmExists = alarms.some(alarm => 
        alarm.time === `${hours}:${minutes}` && alarm.ampm === ampm
    );
    
    if (alarmExists) {
        alert('This alarm is already set!');
        return;
    }
    
    // Add new alarm
    alarms.push({
        time: `${hours}:${minutes}`,
        ampm: ampm,
        triggered: false
    });
    
    // Update UI
    displayAlarms();
    
    // Reset inputs
    hrsSelect.value = '0';
    minsSelect.value = '00';
    ampmSelect.value = '1';
}

function displayAlarms() {
    if (alarms.length === 0) {
        alarmList.innerHTML = '<li class="no-alarms">No Alarms set yet</li>';
        return;
    }
    
    alarmList.innerHTML = '';
    
    alarms.forEach((alarm, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${alarm.time} ${alarm.ampm}</span>
            <button class="delete-alarm" data-index="${index}">Delete</button>
        `;
        alarmList.appendChild(li);
    });
    
    // Add delete functionality
    document.querySelectorAll('.delete-alarm').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            alarms.splice(index, 1);
            displayAlarms();
        });
    });
}

// Stopwatch Functions
function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchInterval = setInterval(updateStopwatch, 1000);
        stopwatchRunning = true;
        startStopwatchBtn.textContent = 'Resume';
    }
}

function pauseStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    stopwatchDisplay.value = '00:00:00';
    stopwatchRunning = false;
    startStopwatchBtn.textContent = 'Start';
}

function updateStopwatch() {
    stopwatchTime++;
    const hours = Math.floor(stopwatchTime / 3600);
    const minutes = Math.floor((stopwatchTime % 3600) / 60);
    const seconds = stopwatchTime % 60;
    
    stopwatchDisplay.value = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Countdown Functions
function startCountdown() {
    if (!countdownRunning) {
        // Initialize countdown time if not already set
        if (countdownTime === 0) {
            if (!parseCountdownInput()) return;
        }
        
        countdownInterval = setInterval(updateCountdown, 1000);
        countdownRunning = true;
        startCountdownBtn.textContent = 'Resume';
        countdownInput.disabled = true;
    }
}

function parseCountdownInput() {
    const timeInput = countdownInput.value.trim();
    
    if (!timeInput) {
        alert('Please enter a countdown time (MM:SS)');
        return false;
    }
    
    // Parse MM:SS format
    const [minutes, seconds] = timeInput.split(':').map(Number);
    
    if (isNaN(minutes) || isNaN(seconds) || minutes < 0 || seconds < 0 || seconds >= 60) {
        alert('Please enter time in MM:SS format (e.g., 05:30 for 5 minutes 30 seconds)');
        return false;
    }
    
    countdownTime = minutes * 60 + seconds;
    originalCountdownTime = countdownTime;
    return true;
}

function pauseCountdown() {
    clearInterval(countdownInterval);
    countdownRunning = false;
}

function resetCountdown() {
    clearInterval(countdownInterval);
    countdownTime = 0;
    originalCountdownTime = 0;
    countdownDisplay.value = '00:00:00';
    countdownInput.value = '';
    countdownRunning = false;
    startCountdownBtn.textContent = 'Start';
    countdownInput.disabled = false;
    progressBar.style.width = '100%';
    progressBar.style.backgroundColor = '#4CAF50';
}

function updateCountdown() {
    if (countdownTime <= 0) {
        clearInterval(countdownInterval);
        countdownRunning = false;
        countdownDisplay.value = '00:00:00';
        progressBar.style.width = '0%';
        alert('Countdown finished!');
        countdownInput.disabled = false;
        return;
    }
    
    countdownTime--;
    
    const hours = Math.floor(countdownTime / 3600);
    const minutes = Math.floor((countdownTime % 3600) / 60);
    const seconds = countdownTime % 60;
    
    countdownDisplay.value = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Update progress bar
    updateProgressBar();
}

function updateProgressBar() {
    const progressPercentage = (countdownTime / originalCountdownTime) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    
    // Change color based on remaining time
    if (progressPercentage < 20) {
        progressBar.style.backgroundColor = '#f44336'; // Red
    } else if (progressPercentage < 50) {
        progressBar.style.backgroundColor = '#FFC107'; // Yellow
    } else {
        progressBar.style.backgroundColor = '#4CAF50'; // Green
    }
}

// Keyboard Event Handler
function handleKeyPress(e) {
    if (e.key === 'Enter') {
        if (document.activeElement === countdownInput) {
            startCountdown();
        } else {
            setAlarm();
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);