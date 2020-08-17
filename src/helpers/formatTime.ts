import { Calendar } from "../interfaces";

// Returns 12H or 24H clock
export function formatTime(use24Hour: boolean, date: Date, hideAMPM?: boolean): string {
	return use24Hour
		? `${date.getHours()}`.padStart(2, '0') + ':' + `${date.getMinutes()}`.padStart(2, '0')
		: `${((date.getHours() + 11) % 12) + 1}`.padStart(2, '0') + ':' + `${date.getMinutes()}`.padStart(2, '0') + (hideAMPM ? '' : (date.getHours() > 12 ? 'PM' : 'AM'));
}

export function formatDateStr(date: Date): string {
	return `${Calendar.monthsOfYear[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}