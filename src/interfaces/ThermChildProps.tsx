import Therma from "./Therm";

export default interface ThermChildProps {
    thermostat: Therma,
    updateModalDisplay: Function,
    width: string,
    id?: any,
}