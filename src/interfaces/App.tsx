import HeaderState from '../interfaces/Header';
import ThermostatState from '../interfaces/Therm';
import ForecastState from '../interfaces/Forecast';
import {timeZone} from '../config';

const date = new Date().toLocaleString('en-US', {timeZone})

export interface AppState {
    header: HeaderState;
    thermostats: ThermostatState[],
    forecast: ForecastState[],
    showThermModal: boolean,
    thermModalIdx: number,
    date: Date,
    use24Hour: boolean,
    degreesFormat: string,
}

export function init(): AppState {
    return {
        header: {city: '', state: '', temperature: 0},
        thermostats: [{id: 0, name: '', temperature: 0, is_hygrostat: false, time: ''}],
        forecast: [{date: '', condition: '', day_temp: 0, night_temp: 0}],
        showThermModal: false,
        thermModalIdx: -1,
        date: new Date(date),
        use24Hour: true,
        degreesFormat: 'Fahrenheit',
    }
}