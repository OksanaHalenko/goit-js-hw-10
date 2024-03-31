import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");
const timer = document.querySelectorAll(".value");
let userSelectedDate;
let intervalId = null;
startBtn.disabled = false;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const currentTime = Date.now();
      if (currentTime - selectedDates[0].getTime() >= 0) {
        startBtn.disabled = true;
        iziToast.show({
       message: "Please choose a date in the future"
       });
      } else {
           startBtn.disabled = false;
      userSelectedDate = selectedDates[0];
      }
  },
};

flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", clickOnStart);

function clickOnStart() {
    startBtn.disabled = true;
    input.disabled = true;
    
    const userTime = userSelectedDate.getTime();
    console.log(userTime);
    intervalId = setInterval(() => {
        const currentTime = Date.now();
        let deltaTime = userTime - currentTime;
        const time = convertMs(deltaTime);
        const formattedTime = addLeadingZero(time);
        updateClockFace(formattedTime);
    if (deltaTime < 0) {
        console.log("stop");
        clearInterval(intervalId);
        timer[0].textContent = "00";
        timer[1].textContent = "00";
        timer[2].textContent = "00";
        timer[3].textContent = "00";
        startBtn.disabled = false;
        input.disabled = false;
    }
    }, 1000);
    
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    const formatDays = String(value.days).padStart(2, "0");
    const formatHours = String(value.hours).padStart(2, "0");
    const formatMinutes = String(value.minutes).padStart(2, "0");
    const formatSeconds = String(value.seconds).padStart(2, "0");
    return { formatDays, formatHours, formatMinutes, formatSeconds };
}

function updateClockFace({ formatDays, formatHours, formatMinutes, formatSeconds }) {
    timer[0].textContent = formatDays;
    timer[1].textContent = formatHours;
    timer[2].textContent = formatMinutes;
    timer[3].textContent = formatSeconds;
}
