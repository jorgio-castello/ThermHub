import { Therm } from "./Therm";
import Settings from "./Settings";

export type ThermModalProps = {
	therm: Therm,
	updateModalDisplay: Function,
	showThermModal: boolean,
	past: Therm[],
	settings: Settings,
	setSettings: Function,
}