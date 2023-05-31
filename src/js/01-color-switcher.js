const buttonStartEl = document.querySelector('button[data-start]');
const buttonStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let bodyColorId = null;
buttonStopEl.disabled = true;

function getRandomHexColor() {
            return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};
function startColor() {
        bodyColorId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor()
        buttonStartEl.disabled = true;
        buttonStopEl.disabled = false;
    }, 1000);
};
function stopColor() {
    clearInterval(bodyColorId);
    buttonStartEl.disabled = false;
    buttonStopEl.disabled = true;
};
buttonStartEl.addEventListener('click',  startColor);
buttonStopEl.addEventListener('click', stopColor);

