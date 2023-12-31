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
const alarmSound = new Audio("./sounds/alarm.mp3");

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
  // Update timer durations immediately after saving settings
  workMins = parseInt(workDurationInput.value);
  breakMins = parseInt(breakDurationInput.value);
  workDuration = workMins * 60;
  breakDuration = breakMins * 60;
  if (workMode.classList.contains("active")) {
    countdownDuration = workDuration;
  } else {
    countdownDuration = breakDuration;
  }

  localStorage.setItem("workMins", workMins);
  localStorage.setItem("breakMins", breakMins);
  console.log(`Stored Work Mins: ${workMins}`);
  console.log(`Stored Break Mins: ${breakMins}`);
  modal.style.display = "none";
  updateTimer(); // Update the timer display immediately after saving settings
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
  const formattedTime = `${formatTime(minutes)} : ${formatTime(seconds)}`;
  timerElement.textContent = formattedTime;
  document.title = `${formattedTime}`;
  if (countdownDuration === 1) {
    alarmSound.play();
  }
  if (countdownDuration === 0) {
    timerElement.classList.add("seesaw");
    if (workMode.classList.contains("active")) {
      // If it was the work duration, start the break
      countdownDuration = breakDuration;
      workMode.classList.remove("active");
      breakMode.classList.add("active");
      document.body.style.background = "#3e2b77";
    } else {
      // If it was the break duration, start the work
      countdownDuration = workDuration;
      workMode.classList.add("active");
      breakMode.classList.remove("active");
      document.body.style.background = "#1e1f28";
    }
    timerElement.textContent =
      formatTime(Math.floor(countdownDuration / 60)) +
      ":" +
      formatTime(countdownDuration % 60);
    // Add a 1-second delay before updating the timer display
    timerElement.classList.add("seesaw");
    setTimeout(() => {
      timerElement.classList.remove("seesaw");
      updateTimer();
    }, 12000);
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
// Set Work as default mode on Load

document.addEventListener("DOMContentLoaded", () => {
  workMode.classList.add("active");
  breakMode.classList.remove("active");
  countdownDuration = workDuration;
  updateTimer();
});
//Reset Timer
const resetTimer = () => {
  const isConfirmed = confirm("Are you sure you want to stop this session?");
  if (isConfirmed) {
    // User clicked "OK"
    pauseTimer();
    if (workMode.classList.contains("active")) {
      countdownDuration = workDuration;
    } else {
      countdownDuration = breakDuration;
    }
    updateTimer();
    console.log("Proceeding...");
  } else {
    // User clicked "Cancel"
    console.log("Cancelled.");
  }
};
resetButton.addEventListener("click", resetTimer);
