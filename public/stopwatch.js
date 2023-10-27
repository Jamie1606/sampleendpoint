let startTime;
let isRunning = false;
let intervalId;

const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");

function formatTime(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function updateDisplay() {
  const currentTime = Date.now() - startTime;
  display.textContent = formatTime(currentTime);
}

// Start the stopwatch when the page loads
window.addEventListener("load", () => {
  startTime = Date.now(); // Initialize startTime to the current time
  intervalId = setInterval(updateDisplay, 1000);
  startStopButton.textContent = "Stop";
  isRunning = true;
});

resetButton.addEventListener("click", function () {
  clearInterval(intervalId);
  display.textContent = "00:00";
  startStopButton.textContent = "Start";
  isRunning = false;
  startTime = Date.now(); // Reset startTime to the current time
});
