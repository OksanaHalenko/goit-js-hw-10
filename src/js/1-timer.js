import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateTimeInput = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");
const timer = document.querySelector(".timer");

let userSelectedDate;
startBtn.disabled = false;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      const currentTime = Date.now();
      if (currentTime - selectedDates[0].getTime() >= 0) {
        startBtn.disabled = true;
          window.alert("Please choose a date in the future");
      } else {
           startBtn.disabled = false;
      userSelectedDate = selectedDates[0];
      }
     
  },
};
flatpickr("#datetime-picker", options);

