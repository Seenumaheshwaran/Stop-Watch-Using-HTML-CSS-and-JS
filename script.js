let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const lapBtn = document.getElementById('lapBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const laps = document.getElementById('laps');

startBtn.addEventListener('click', ()=>{
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
    }
});
lapBtn.addEventListener('click', ()=>{
    if (isRunning) {
        lapCounter++;
        const lapTime = formatTime(Date.now() - startTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapElement);
    }
});
stopBtn.addEventListener('click', ()=>{
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
    }
});
resetBtn.addEventListener('click', ()=>{
    isRunning = false;
    clearInterval(timer);
    startTime = null;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    laps.innerHTML = '';
    lapCounter = 0;
});


function updateDisplay() {
    const time = Date.now() - startTime;
    display.textContent = formatTime(time);
}

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}


