import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
require("flatpickr/dist/themes/dark.css")

Notiflix.Notify.init({
  width: '300px',
  position: 'center-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '100px',
  opacity: 1,
  borderRadius: '10px',
  rtl: false,
  timeout: 3000,
  messageMaxLength: 110,
  backOverlay: true,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: true,
  pauseOnHover: true,

  ID: 'NotiflixNotify',
  className: 'notiflix-notify',
  zindex: 4001,
  fontFamily: 'Quicksand',
  fontSize: '24px',
  cssAnimation: true,
  cssAnimationDuration: 600,
  cssAnimationStyle: 'zoom', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
  closeButton: false,
  useIcon: true,
  useFontAwesome: false,
  fontAwesomeIconStyle: 'shadow', // 'basic' - 'shadow'
  fontAwesomeIconSize: '34px',

  warning: {
    background: 'red',
    textColor: '#fff',
    childClassName: 'notiflix-notify-warning',
    notiflixIconColor: '#fff',
    fontAwesomeClassName: 'fas fa-exclamation-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(238,191,49,0.2)',
  },
});

const inputEl = document.getElementById('datetime-picker');
const startEl = document.querySelector('[data-start]');
const spanDaysEl = document.querySelector('[data-days]');
const spanHoursEl = document.querySelector('[data-hours]');
const spanMinutesEl = document.querySelector('[data-minutes]');
const spanSecondsEl = document.querySelector('[data-seconds]');

let intervalId;
let objConvert = {};

startEl.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    options.selectDate = selectedDates[0]
    if (options.selectDate < options.defaultDate) {
      startEl.disabled = true;
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      startEl.disabled = false;
    }
    
  }, 
 
};
startEl.addEventListener('click', start)

flatpickr(inputEl, options);
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

function start() {
startEl.disabled = true;
  intervalId = setInterval(() => {
    let date = new Date();
    let differenceTime = options.selectDate - date;
    if (date >= options.selectDate) {
      stop(intervalId);
      return;
    }
    objConvert = convertMs(differenceTime);
    addTime(objConvert);
  }, 1000)
}
function stop(id) { 
  clearInterval(id);
}
function addTime({ days, hours, minutes, seconds }) {
  spanDaysEl.textContent = days.toString().padStart(2, '0');
  spanHoursEl.textContent = hours.toString().padStart(2, '0');
  spanMinutesEl.textContent = minutes.toString().padStart(2, '0');
  spanSecondsEl.textContent = seconds.toString().padStart(2, '0');
}

