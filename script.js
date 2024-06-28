let startTime = 0;
let elapsedTime = 0;
let intervalId = null;

const displayElement = document.getElementById('display');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const lapButton = document.getElementById('lap-button');
const lapTimesList = document.getElementById('lap-times');

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLapTime);

function startStopwatch() {
    startTime = new Date().getTime() - elapsedTime;
    intervalId = setInterval(updateDisplay, 10); // Update every 10 milliseconds
    startButton.disabled = true;
    pauseButton.disabled = false;
}

function pauseStopwatch() {
    clearInterval(intervalId);
    elapsedTime = new Date().getTime() - startTime;
    pauseButton.disabled = true;
    startButton.disabled = false;
}

function resetStopwatch() {
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    displayElement.textContent = '00:00:00.00';
    lapTimesList.innerHTML = '';
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function recordLapTime() {
    const lapTime = formatTime(elapsedTime);
    const lapListItem = document.createElement('li');
    lapListItem.textContent = lapTime;
    lapTimesList.appendChild(lapListItem);
}

function updateDisplay() {
    const currentTime = new Date().getTime();
    elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    displayElement.textContent = formattedTime;
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

function pad(number) {
    return (number < 10 ? '0' : '') + number;
}
