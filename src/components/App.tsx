import React from 'react';
import CONFIG from '../config';
import { Dashboard, Screensaver } from './';
import { DegreesFormat, generateHeader, NowResponse, Therm, TimeFormat } from '../interfaces';
import { convertBinaryToBase64, getDate, getNow } from '../helpers'
import { closeModal, expandThermPanel, setTemperatureFormat, setTimeFormat, toggleRaspberrySettings, setThermInterval } from '../eventHandlers';
import { AppState, Screen } from '../interfaces/App';
import ScreenSaver from './Screensaver';

class App extends React.Component<{}, AppState> {
	private timeThread = 0;

	constructor(props: {}) {
		super(props);
		this.state = AppState.default();

		this.closeModal = closeModal.bind(this);
		this.expandThermPanel = expandThermPanel.bind(this);
		this.setTemperatureFormat = setTemperatureFormat.bind(this);
		this.setTimeFormat = setTimeFormat.bind(this);
		this.setThermInterval = setThermInterval.bind(this);
		this.toggleRaspberrySettings = toggleRaspberrySettings.bind(this);
	}

	componentDidMount(): void {
		const startTime = getNow();
		this.fetchScreenSaver()
			.then(screenSaverSrc => this.setState({ screenSaverSrc }));
		this.updateData(startTime)
			.then(() => {
				this.startTimeThread();
			});
	}

	componentWillUnmount(): void {
		if (this.timeThread) {
			clearInterval(this.timeThread);
			this.timeThread = 0;
		}
	}

	closeModal(): void { };
	expandThermPanel(e: Event): void { };
	toggleRaspberrySettings(): void { };
	setTimeFormat(use24Hour: TimeFormat): void { };
	setTemperatureFormat(degreesFormat: DegreesFormat): void { };
	setThermInterval(thermInterval: number): void { };

	private startTimeThread(): void {
		this.timeThread = window.setInterval(() => {
			const date = getDate();
			if (date !== undefined) {
				this.setState({ date, screen: Screen.ScreenSaver });
				this.updateData(date);
			}
		}, 2000);
	}

	private async updateData(now: Date): Promise<void> {
		await this.fetchNow()
			.then(data => {
				const { forecast_daily, thermostats } = data;
				const currentWeatherData = thermostats.find(therm => therm.name === 'weather.gov');

				this.setState({
					header: generateHeader(CONFIG.city, CONFIG.state, currentWeatherData?.temperature),
					thermostats,
					forecastDaily: forecast_daily,
				});
			});
		await this.fetchPast(new Date(now.getTime() - 43200000), now)
			.then(past => {
				if (past.length > 0) {
					this.setState({ past });
				}
			});
	}

	private fetchNow = (): Promise<NowResponse> => {
		return fetch(`${CONFIG.host}/now`, { headers: CONFIG.headers }).then(res => res.json());
	}

	private fetchPast = (after: Date, before: Date): Promise<Therm[]> => {
		let query = `${CONFIG.host}/past?start_date=${after.toISOString()}&end_date=${before.toISOString()}`;
		return fetch(query, { headers: CONFIG.headers }).then(res => res.json());
	}

	private fetchScreenSaver = () => {
		return fetch(`${CONFIG.host}/background-photos`, { headers: CONFIG.headers })
			.then(res => res.blob())
			// @ts-ignore is required here as Node's defn of blob doens't contain arrayBuffer
			.then(blob => blob.arrayBuffer())
			.then(bytes => convertBinaryToBase64(bytes))
	}

	render() {
		const { header, date, forecastDaily, use24Hour, degreesFormat, past, screenSaverSrc, screen, showThermModal, showRaspberrySettings, thermModalIdx, thermInterval, thermostats } = this.state;
		return (
			<>
				<ScreenSaver date={date} screenSaverSrc={screenSaverSrc} screen={screen} tap={() => this.setState({ screen: Screen.Dashboard })} />
				<Dashboard
					header={header}
					date={date}
					forecast_daily={forecastDaily}
					use24Hour={use24Hour}
					degreesFormat={degreesFormat}
					past={past}
					showThermModal={showThermModal}
					showRaspberrySettings={showRaspberrySettings}
					thermInterval={thermInterval}
					setTemperatureFormat={this.setTemperatureFormat}
					setThermInterval={this.setThermInterval}
					setTimeFormat={this.setTimeFormat}
					screen={screen}
					thermModalIdx={thermModalIdx}
					toggleRaspberrySettings={this.toggleRaspberrySettings}
					thermostats={thermostats}
					updateModalDisplay={this.closeModal}
					expandThermPanel={this.expandThermPanel}
				/>
			</>
		);
	}
}

export default App;
