import { Therm } from "../interfaces/Therm";
import { formatPastTime } from '../helpers/formatTime';
import scrubTemperature from '../helpers/temperatureScrubber';

function calculateMidpoint(left: number, right: number): number {
  return Math.floor((left + right) / 2);
}

function generateIndices(ticks: number, lastIdx: number): number[] {
  let result: number[] = [];

  let left = 0;
  let right = lastIdx;
  let midpoint = calculateMidpoint(left, right);
  result.push(midpoint);

  let tempRight = midpoint + 1;
  while (result.length !== Math.floor(ticks / 2)) {
    let midpoint = calculateMidpoint(left, tempRight);
    result.push(midpoint);
    tempRight = midpoint + 1;
  }

  let tempLeft = midpoint;
  while (result.length !== ticks - 2) {
    let midpoint = calculateMidpoint(tempLeft, right);
    result.push(midpoint);
    tempLeft = midpoint;
  }

  result.push(left);
  result.push(right);
  return result.sort((a, b) => a - b);
}

export function generateAxes(pastData: Therm[], numberOfTicks: number, degreesFormat: string, use24Hour: boolean) {
  if (pastData) {
    numberOfTicks = Math.max(numberOfTicks, 5); // Need odd number of ticks to keep x-axis symettrical
    numberOfTicks = numberOfTicks % 2 === 1 ? numberOfTicks : numberOfTicks - 1;
    const indices = generateIndices(numberOfTicks, pastData.length - 1);

    const dateAxis: string[] = indices.map(idx => formatPastTime(use24Hour, new Date(pastData[idx].time), true));
    const temperatureAxis: number[] = indices.map(idx => scrubTemperature(pastData[idx].temperature, degreesFormat));
    const humidityAxis: number[] = [];
    indices.forEach(idx => {
      if (pastData[idx].is_hygrostat) {
        humidityAxis.push(pastData[idx].relative_humidity / 100);
      }
    })
    return [dateAxis, temperatureAxis, humidityAxis];
  }
}