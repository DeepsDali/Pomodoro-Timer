const timerElement = document.querySelector("#timer");
const startButton = document.querySelector("#startButton");
const resetButton = document.querySelector("#resetButton");
const workMode = document.querySelector("#work");
const breakMode = document.querySelector("#break");
const setting = document.querySelector("#setting");
const modal = document.querySelector("#modal");
const workDurationInput = document.querySelector("#workDurationInput");
const breakDurationInput = document.querySelector("#breakDurationInput");
const saveSettingsButton = document.querySelector("#saveSettingsButton");
const closeSettingsButton = document.querySelector("#closeSettingsButton");

//Open and close modal
let workMins = 25;
let breakMins = 5;

setting.addEventListener("click", () => (modal.style.display = "block"));
closeSettingsButton.addEventListener(
  "click",
  () => (modal.style.display = "none")
);
//Store timer duration input values to local storage
const saveSettings = () => {
  localStorage.setItem("workMins", parseInt(workDurationInput.value));
  localStorage.setItem("breakMins", parseInt(breakDurationInput.value));
  modal.style.display = "none";
};
const storedWorkMins = localStorage.getItem("workMins");
const storedBreakMins = localStorage.getItem("breakMins");
console.log(`Stored Work Mins: ${storedWorkMins}`);
console.log(`Stored Break Mins: ${storedBreakMins}`);

saveSettingsButton.addEventListener("click", saveSettings);

//Start/Pause Btn
// Get timer duration input values from local storage

if (storedWorkMins !== null) {
  workMins = parseInt(storedWorkMins);
}

if (storedBreakMins !== null) {
  breakMins = parseInt(storedBreakMins);
}
// convert minutes to seconds
let workDuration = workMins * 60;
let breakDuration = breakMins * 60;

let countdownDuration = workDuration; // Initial countdown duration is set to work duration

let timerInterval;
let isTimerPaused = true; // To track if the timer is currently paused
let isTimerRunning = false; // To track if the timer is currently running
const toggleTimer = () => {
  if (isTimerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
};

const startTimer = () => {
  isTimerRunning = true;
  startButton.textContent = "Pause";
  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
};

const pauseTimer = () => {
  isTimerRunning = false;
  isTimerPaused = true;
  startButton.textContent = "Start";
  clearInterval(timerInterval);
};

const formatTime = (time) => (time < 10 ? "0" + time : time);

const updateTimer = () => {
  const minutes = Math.floor(countdownDuration / 60);
  const seconds = countdownDuration % 60;
  timerElement.textContent = formatTime(minutes) + ":" + formatTime(seconds);
  if (countdownDuration === 0) {
    timerElement.textContent =
      formatTime(Math.floor(workDuration / 60)) +
      ":" +
      formatTime(workDuration % 60);
    pauseTimer();

    countdownDuration = workDuration;
  }
  countdownDuration--;
};
startButton.addEventListener("click", toggleTimer);

//Work/ Break Modes
// Event listener for "Work" button
workMode.addEventListener("click", () => {
  if (!isTimerRunning) {
    countdownDuration = workDuration;
    updateTimer();
    workMode.classList.add("active");
    breakMode.classList.remove("active");
    document.body.style.background = "#1e1f28";
  }
});

// Event listener for "Break" button
breakMode.addEventListener("click", () => {
  if (!isTimerRunning) {
    countdownDuration = breakDuration;
    updateTimer();
    breakMode.classList.add("active");
    workMode.classList.remove("active");
    document.body.style.background = "#3e2b77";
  }
});
