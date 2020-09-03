import { Therm } from "./Therm";
import Settings from "./Settings";

export type ThermPanelProps = {
	thermostatData: Therm[],
	expandThermPanel: Function,
	pastData: Therm[],
	settings: Settings,
	showThermModal: boolean,
}