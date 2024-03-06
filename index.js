let startTime = 0;
let running= false;
let timerInterval;
let pausedTime = 0;

const timeDisplay = document.querySelector('.time');
const startBtn = document.querySelector('.start');
const pauseBtn= document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');
const lapBtn = document.querySelector('.lap');
const lapsList= document.querySelector('.laps');

function startTimer(){
    if(!running){
        startTime = Date.now()-pausedTime;
        timerInterval = setInterval(updateTime, 1000);
        running = true;
        toggleButtons();
    }
}
function pauseTimer(){
    if(running){
        clearInterval(timerInterval);
        pausedTime = Date.now()-startTime;
        running = false;
        toggleButtons();
    }
}

function resetTimer(){
    clearInterval(timerInterval);
    pausedTime = 0;
    running = false;
    updateTimeDisplay(0);
    lapsList.innerHTML = '';
    toggleButtons();
}
function lap(){
    if(running){
        const lapTime = calculateLapTime();
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    }
}
function updateTime(){
    const elapsedTime = Date.now()-startTime;
    updateTimeDisplay(elapsedTime);
}
function updateTimeDisplay(time){
    const formattedTime = formatTime(time);
    timeDisplay.textContent = formattedTime;
}
function formatTime(time){
    const totalSeconds = Math.floor(time/1000);
    const minutes = Math.floor(totalSeconds /60);
    const seconds= totalSeconds % 60;
    const hours = Math.floor(minutes/60);
   return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
function pad(num){
    return num.toString().padStart(2,'0');
}
function calculateLapTime(){
    const lapTime=Date.now()-startTime;
    return formatTime(lapTime);
}
function toggleButtons(){
    startBtn.disabled = running;
    pauseBtn.disabled = !running;
}
startBtn.addEventListener('click',startTimer);
pauseBtn.addEventListener('click',pauseTimer);
resetBtn.addEventListener('click',resetTimer);
lapBtn.addEventListener('click',lap);
