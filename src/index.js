import './styles.css';
import refs from './refs.js';
let interval = null;
function reset(...arr) {
  return arr.map(el => (el.textContent = '00'));
}
class CountdownTimer {
  constructor(selector, targetDate) {
    this.selector = selector;
    this.targetDate = targetDate;
  }
  count() {
    let t = this.setTime(this.targetDate - Date.now());

    refs.days.textContent = t.days;
    refs.hours.textContent = t.hours;
    refs.mins.textContent = t.mins;
    refs.secs.textContent = t.secs;
    refs.title.textContent = this.targetDate.toDateString();
  }
  setTime(time) {
    let days = Math.floor(time / 1000 / 60 / 60 / 24);
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let secs = Math.floor((time % (1000 * 60)) / 1000);
    return { days, hours, mins, secs };
  }
  start() {
    clearInterval(interval);
    this.count();
    interval = setInterval(() => {
      this.count();
    }, 1000);
  }
  stop() {
    const { days, hours, mins, secs } = refs;
    clearInterval(interval);
    reset(days, hours, mins, secs);
  }
}

refs.btnStart.addEventListener('click', () => {
  timer.start();
});

refs.btnStop.addEventListener('click', () => {
  timer.stop();
});
const timer = new CountdownTimer('#timer-1', new Date('Jan 1, 2021'));

document.addEventListener('DOMContentLoaded', timer.start());
