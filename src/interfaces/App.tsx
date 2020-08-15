import HeaderState from '../interfaces/Header';
import ThermostatState from '../interfaces/Therm';
import ForecastState from '../interfaces/Forecast';

export interface AppState {
    date: Date;
    header: HeaderState;
    thermostats: ThermostatState[],
    past: ThermostatState[],
    forecast: ForecastState[],
    showThermModal: boolean,
    thermModalIdx: number,
}

export function init(): AppState {
    return {
        date: new Date(),
        header: {city: '', state: '', temperature: 0},
        thermostats: [{id: 0, name: '', temperature: 0, is_hygrostat: false, time: ''}],
        past: [],
        forecast: [{date: '', condition: '', day_temp: 0, night_temp: 0}],
        showThermModal: false,
        thermModalIdx: -1,
    }
}