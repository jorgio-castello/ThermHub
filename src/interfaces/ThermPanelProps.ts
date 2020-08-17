import { Therm } from "./";

export type ThermPanelProps = {
    thermostatData: Therm[],
    expandThermPanel: Function,
    degreesFormat: string,
    use24Hour: boolean,
    pastData: Therm[],
    showThermModal: boolean,
}