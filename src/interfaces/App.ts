import { Forecast as ForecastState, Header as HeaderState, Therm as ThermostatState } from '../interfaces';

export type AppState = {
	date: Date;
	header: HeaderState;
	thermostats: ThermostatState[],
	past: ThermostatState[],
	forecast: ForecastState[],
	showThermModal: boolean,
	thermModalIdx: number,
	use24Hour: boolean,
	degreesFormat: string,
	showRaspberrySettings: boolean,
}

export function init(): AppState {
	return {
		date: new Date(),
		header: { city: '', state: '', temperature: 0 },
		thermostats: [{ id: 0, name: '', temperature: 0, is_hygrostat: false, time: '', relative_humidity: 0 }],
		past: [],
		forecast: [{ date: '', condition: '', day_temp: 0, night_temp: 0 }],
		showThermModal: false,
		thermModalIdx: -1,
		use24Hour: true,
		degreesFormat: 'Fahrenheit',
		showRaspberrySettings: false,
	}
}