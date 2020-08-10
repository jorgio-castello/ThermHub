import {host, timeZone} from '../config';

let lastTimestamp: Date|undefined;
let offset = 0;

/**
 * Sets the difference between local system time and the API server.
 */
function getOffset(): void {
  fetch(`${host}/time`)
    .then(text => {
      offset = (new Date()).getTime() - (parseInt(text, 10) * 1000);
    });
}

/**
 * Returns either the current target system date, or undefined if the
 * request is throttled. Because we only show the date to the minute,
 * we throttle requests until the minutes are different, to avoid unecessary
 * state changes.
 */
export function getDate(): Date|undefined {
  // Get the current system date converted into target time zone
  let now: Date;
  now = new Date((new Date()).getTime() + offset);
  now = new Date(now.toLocaleString('en-US', {timeZone}));

  // If there is no lastTimestamp, you should calculate the offset
  // between server time and local time, and yield the current timestamp.
  if (lastTimestamp === undefined) {
    getOffset();
    lastTimestamp = now;
    return now;
  } 
  
  // Otherwise, check if the minutes differ and yield that timestamp.
  else if (lastTimestamp.getMinutes() !== now.getMinutes()) {
    lastTimestamp = now;
    return now;
  }

  // UI is current, no updates are necessary.
  return undefined;
}