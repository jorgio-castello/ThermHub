import { Therm } from "./";

export type ThermModalProps = {
	therm: Therm,
	updateModalDisplay: Function,
	degreesFormat: string,
	use24Hour: boolean,
	showThermModal: boolean,
}