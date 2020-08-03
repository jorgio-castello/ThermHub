import HeaderState from '../interfaces/Header';
import ThermostatState from '../interfaces/Therm';
import ForecastState from '../interfaces/Forecast';

export interface AppState {
    header: HeaderState;
    thermostats: ThermostatState[],
    forecast: ForecastState[],
}

export function init(): AppState {
    return {
        header: {city: '', state: '', date: new Date(), temperature: 0, time: ''},
        thermostats: [{id: 0, name: '', temperature: 0, is_hygrostat: false, time: ''}],
        forecast: [{date: '', condition: '', day_temp: 0, night_temp: 0}],
    }
}