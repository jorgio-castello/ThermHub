import { Header } from './Header';
import Settings from './Settings';

export type HeaderProps = {
	headerData: Header,
	date: Date,
	settings: Settings,
	toggleRaspberrySettings: Function,
}