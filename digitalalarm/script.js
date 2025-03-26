let number_of_alarms = 0;
let alarms = [];

function showdate() {
    const d = new Date();
    const month = d.getMonth() + 1; 
    const year = d.getFullYear();
    const day = d.getDate();

    let fulldate = `${day}/${month}/${year}`; 

    let datevalue = document.getElementById("date");
    datevalue.value = fulldate;
}

showdate();

function updateTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be converted to 12

    // Pad single digits with leading zeros
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    let timeString = `${hours}:${minutes}:${seconds} ${ampm}`;

    document.querySelector('.display_screen').value = timeString;
}

// Update the time every second
setInterval(updateTime, 1000);

function display_alarms() {
    let mylist = document.getElementById("myalarms");

    mylist.innerHTML = '';

    alarms.forEach((alarm, i) => {
        let li = document.createElement("li");
        li.textContent = alarm;

        // Create a delete button
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "deletebutton";
        deleteButton.addEventListener("click", function() {
            removeAlarm(i);
        });

        li.appendChild(deleteButton);
        mylist.appendChild(li);
    });
}

function appendalarm() {
    let hrs = document.getElementById("hrs").value;
    let minutes = document.getElementById("minutes").value;
    let ampm = document.getElementById("ampm").value === "1" ? "AM" : "PM";

    let alarmtext = `${hrs}:${minutes} ${ampm}`;
    alarms.push(alarmtext);
    number_of_alarms += 1;

    // Reset values after setting the alarm
    document.getElementById("hrs").value = "0";
    document.getElementById("minutes").value = "00";
    document.getElementById("ampm").value = "1";

    display_alarms();
}

function removeAlarm(index) {
    alarms.splice(index, 1);
    number_of_alarms -= 1;
    display_alarms();
}


updateTime();


//-------------------timer----------------------

let timerInterval;
let time = 0;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const timer_container = document.getElementById("timer-container");
// window.onload = function(){ timer_container.style.backgroundColor = "white"};


const startPauseButton = document.getElementById("startPause");
const resetButton = document.getElementById("reset");

function parseTime(input) {
    const parts = input.split(":").map(Number);
    if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
    } else if (parts.length === 1) {
        return parts[0];
    }
    return 0;
}

function formatTime(seconds) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimerDisplay() {
    timerDisplay.value = formatTime(time);
    // if (time > 10) {
    //     timerDisplay.style.backgroundColor = "#28a745";
    //     timer_container.style.backgroundColor = "#28a745";
    //     timerDisplay.style.color = "white";
    // } else if (time > 5) {
    //     timerDisplay.style.backgroundColor = "#ffc107";
    //     timer_container.style.backgroundColor = "#ffc107";
    //     timerDisplay.style.color = "black";
    // } else {
    //     timerDisplay.style.backgroundColor = "#dc3545";
    //     timer_container.style.backgroundColor = "#dc3545";
    //     timerDisplay.style.color = "white";
    // }
}

function startPauseTimer() {
    if (!isRunning) {
        if (time === 0) {
            time = parseTime(timerDisplay.value);
            if (time <= 0) return;
        }
        
        timerInterval = setInterval(() => {
            if (time > 0) {
                time--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                startPauseButton.textContent = "Start";
            }
        }, 1000);
        startPauseButton.textContent = "Pause";
    } else {
        clearInterval(timerInterval);
        startPauseButton.textContent = "Resume";
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timerInterval);
    time = 0;
    timerDisplay.value = "";
    timerDisplay.style.backgroundColor = "white";
    timerDisplay.style.color = "black";
    startPauseButton.textContent = "Start";
    isRunning = false;
}

startPauseButton.addEventListener("click", startPauseTimer);
resetButton.addEventListener("click", resetTimer);
// --------------------------------------
