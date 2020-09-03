import App from '../components/App';
import Settings from '../interfaces/Settings';

export function toggleRaspberrySettings(this: App): void {
	this.setState({ showRaspberrySettings: !this.state.showRaspberrySettings });
}

export function setSettings(this: App, settings: Settings, key: string, value: string | number | boolean): void {
	settings[key] = value;
	settings.update(settings);
	this.setState({ settings });
}

export function closeModal(this: App): void {
	this.setState({ showThermModal: false, thermModalIdx: -1 });
}

export function expandThermPanel(this: App, e: Event): void {
	const target = e.currentTarget as HTMLInputElement;
	const index = Number(target.getAttribute('id'));

	this.setState({ showThermModal: true, thermModalIdx: index })
}
