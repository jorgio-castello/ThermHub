import {host, timeZone} from '../config';

let lastTimestamp: Date|undefined;
let offset = 0;

function getOffset(): void {
  fetch(`${host}/time`)
    .then(res => res.text())
    .then(text => {
      offset = (new Date()).getTime() - (parseInt(text, 10) * 1000);
    });
}

export function getDate(): Date|undefined {
  let now: Date;
  now = new Date((new Date()).getTime() + offset);
  now = new Date(now.toLocaleString('en-US', {timeZone}));

  if (lastTimestamp === undefined) {
    getOffset();
    lastTimestamp = now;
    return now;
  }

  else if (lastTimestamp.getMinutes() !== now.getMinutes()) {
    lastTimestamp = now;
    return now;
  }

  return undefined;
}