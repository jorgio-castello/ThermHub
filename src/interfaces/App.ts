import { Forecast as ForecastState, Header as HeaderState, Therm as ThermostatState } from '../interfaces';
import SeedData from '../ThermHub_PastData';

export type AppState = {
	date: Date;
	header: HeaderState;
	thermostats: ThermostatState[],
	past: ThermostatState[],
	forecast_daily: ForecastState[],
	showThermModal: boolean,
	thermModalIdx: number,
	use24Hour: boolean,
	degreesFormat: string,
	showRaspberrySettings: boolean,
	thermInterval: number,
}

export function init(): AppState {
	return {
		date: new Date(),
		header: { city: '', state: '', temperature: 0 },
		thermostats: [{ id: 0, name: '', temperature: 0, is_hygrostat: false, time: '', relative_humidity: 0 }],
		past: SeedData,
		forecast_daily: [{ date: '', condition: '', day_temperature: 0, night_temperature: 0 }],
		showThermModal: false,
		thermModalIdx: -1,
		use24Hour: true,
		degreesFormat: 'Fahrenheit',
		showRaspberrySettings: false,
		thermInterval: 289, // representive of # of 5min intervals, 289 in 24 hours, inclusive of startTime
	}
}