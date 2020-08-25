import { Forecast as ForecastState, Header as HeaderState, Therm as ThermostatState } from '../interfaces';
import SeedData from '../ThermHub_PastData';

export enum Screen {
	ScreenSaver,
	Dashboard,
	Modal,
}

export class AppState {
	constructor(
		public date: Date,
		public header: HeaderState,
		public thermostats: ThermostatState[],
		public past: ThermostatState[],
		public forecastDaily: ForecastState[],
		public forecastHourly: ForecastState[],
		public showThermModal: boolean,
		public thermModalIdx: number,
		public use24Hour: boolean,
		public degreesFormat: string,
		public showRaspberrySettings: boolean,
		public thermInterval: number,
		public screenSaverSrc: string[],
		public screen: Screen,
	) { }

	static default(): AppState {
		return new AppState(
			new Date(),
			{ city: '', state: '', temperature: 0 },
			[],
			[],
			[],
			[],
			false,
			-1,
			true,
			'Fahrenheit',
			false,
			289,
			[],
			Screen.ScreenSaver,
		);
	}
}
