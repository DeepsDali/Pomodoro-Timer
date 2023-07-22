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
