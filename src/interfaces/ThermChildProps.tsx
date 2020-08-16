import Therma from "./Therm";

export default interface ThermChildProps {
    thermostat: Therma,
    updateModalDisplay: Function,
    width: string,
    degreesFormat: string,
    use24Hour: boolean,
    id?: any,
}