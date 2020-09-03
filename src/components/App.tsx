import React, { useState } from 'react';
import CONFIG from '../config';
import Dashboard from './Dashboard';
import Screensaver from './Screensaver';
import { generateHeader } from '../interfaces/Header';
import { NowResponse } from '../interfaces/NowResponse';
import { Therm } from '../interfaces/Therm';
import { convertBinaryToBase64 } from '../helpers/convertBinaryToBase64';
import { getDate, getNow } from '../helpers/trackTime'
import { closeModal, expandThermPanel, setSettings, toggleRaspberrySettings, } from '../eventHandlers';
import { AppState, Screen } from '../interfaces/App';
import ScreenSaver from './Screensaver';
import Settings from '../interfaces/Settings';

class App extends React.Component<{}, AppState> {
	private timeThread = 0;

	constructor(props: {}) {
		super(props);
		this.state = AppState.default();

		this.closeModal = closeModal.bind(this);
		this.expandThermPanel = expandThermPanel.bind(this);
		this.setSettings = setSettings.bind(this);
		this.toggleRaspberrySettings = toggleRaspberrySettings.bind(this);
	}

	componentDidMount(): void {
		const startTime = getNow();
		const settings = new Settings();
		settings.init();
		this.setState({ settings });

		// this.fetchScreenSaver()
		// 	.then(screenSaverSrc => this.setState({ screenSaverSrc }));
		// this.updateData(startTime)
		// 	.then(() => {
		// 		this.startTimeThread();
		// 	});
	}

	componentWillUnmount(): void {
		if (this.timeThread) {
			clearInterval(this.timeThread);
			this.timeThread = 0;
		}
	}

	closeModal(): void { };
	expandThermPanel(e: Event): void { };
	setSettings(settings: Settings, key: string, value: string | boolean | number): void { };
	toggleRaspberrySettings(): void { };

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
		const { header, date, forecastDaily, past, screenSaverSrc, screen, settings, showThermModal, showRaspberrySettings, thermModalIdx, thermostats } = this.state;
		return (
			<>
				<ScreenSaver date={date} screenSaverSrc={screenSaverSrc} screen={screen} tap={() => this.setState({ screen: Screen.Dashboard })} />
				<Dashboard
					header={header}
					date={date}
					forecast_daily={forecastDaily}
					past={past}
					showThermModal={showThermModal}
					showRaspberrySettings={showRaspberrySettings}
					settings={settings}
					setSettings={this.setSettings}
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
