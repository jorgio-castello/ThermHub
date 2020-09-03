import App from '../components/App';
import { DegreesFormat } from '../interfaces/DegreesFormat';
import { TimeFormat } from '../interfaces/TimeFormat';

export function toggleRaspberrySettings(this: App): void {
	this.setState({ showRaspberrySettings: !this.state.showRaspberrySettings });
}

export function setTimeFormat(this: App, use24Hour: TimeFormat): void {
	this.setState(use24Hour);
}

export function setTemperatureFormat(this: App, degreesFormat: DegreesFormat): void {
	this.setState(degreesFormat);
}

export function closeModal(this: App): void {
	this.setState({ showThermModal: false, thermModalIdx: -1 });
}

export function expandThermPanel(this: App, e: Event): void {
	const target = e.currentTarget as HTMLInputElement;
	const index = Number(target.getAttribute('id'));

	this.setState({ showThermModal: true, thermModalIdx: index })
}

export function setThermInterval(this: App, thermInterval: number): void {
	this.setState({ thermInterval })
}