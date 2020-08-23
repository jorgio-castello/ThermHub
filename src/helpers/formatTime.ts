import { Calendar } from "../interfaces";
import { timeZone } from "../config";

function convert24HourTo12Hour(hours: number): number {
	if (hours === 0) return 12;
	if (hours > 12) return hours - 12;
	return hours;
}

function getAMorPM(hours: number): string {
	let am = 'AM';
	let pm = 'PM';

	if (hours === 0) return am;
	if (hours >= 12) return pm;
	return am;
}

function generateTimeStr(use24Hour: boolean, hours: number, minutes: number, hideAMPM?: boolean) {
	return use24Hour
		? `${hours}`.padStart(2, '0') + ':' + `${minutes}`.padStart(2, '0')
		: `${convert24HourTo12Hour(hours)}`.padStart(2, '0') + ':' + `${minutes}`.padStart(2, '0') + (hideAMPM ? '' : (getAMorPM(+hours)));
}

// Returns 12H or 24H clock
export function formatTime(use24Hour: boolean, date: Date, hideAMPM?: boolean): string {
	const hours = date.getHours();
	const minutes = date.getMinutes();
	return generateTimeStr(use24Hour, +hours, +minutes, hideAMPM);
}

export function formatPastTime(use24Hour: boolean, date: Date, hideAMPM?: boolean): string {
	let localTime = date.toLocaleTimeString('en-US', { timeZone, hour12: false });
	localTime = localTime.slice(0, localTime.lastIndexOf(':'));
	const [hours, minutes] = localTime.split(':');
	return generateTimeStr(use24Hour, +hours, +minutes, hideAMPM);
}

export function formatDateStr(date: Date): string {
	return `${Calendar.monthsOfYear[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}