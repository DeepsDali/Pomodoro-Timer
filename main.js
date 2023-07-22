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
