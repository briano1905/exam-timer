// Numeric input scroll to increase/decrease value
document.querySelectorAll('.numeric-input').forEach(input => {
  input.addEventListener('wheel', e => {
    currentNumber = Number(input.innerText);
    if (e.deltaY === -100) {
      input.innerText = currentNumber + 5;
    } else if (e.deltaY === 100 && currentNumber > 0) {
      input.innerText = currentNumber - 5;
    }
  });
});

// Initialise global variables
const timeDisplay = document.querySelector('#time').firstElementChild;
const description = document.querySelector('#time').lastElementChild;
const timer = {
  reading: 0,
  writing: 0
};

// Start button is pressed
document.querySelector('#start-button').addEventListener('mousedown', e => {
  timer.reading = Number(document.querySelector('#reading-time').innerText) + 1;
  timer.writing = Number(document.querySelector('#writing-time').innerText);
  e.target.disabled = true;
  tick();
});

// Tick every minute
function tick() {
  if (timer.reading > 0) {
    timer.reading--;
    if (timer.reading === 0) {
      document.querySelector('#ding').load();
      document.querySelector('#ding').play();
    }
  } else {
    timer.writing--;
  }

  if (timer.reading > 0) {
    timeDisplay.innerText = minuteToDisplay(timer.reading);
    description.innerText = 'reading time';
    setTimeout(tick, 60 * 1000);
  } else if (timer.writing > 0) {
    timeDisplay.innerText = minuteToDisplay(timer.writing);
    description.innerText = 'writing time';
    setTimeout(tick, 60 * 1000);
  } else {
    timeDisplay.innerText = minuteToDisplay(0);
    description.innerText = "time's up";
    document.querySelector('#ding').load();
    document.querySelector('#ding').play();
    document.querySelector('#start-button').disabled = false;
  }
}

// Converts minute number to string format
function minuteToDisplay(minute) {
  return `${Math.floor(minute / 60)}:${minute % 60}`;
}
