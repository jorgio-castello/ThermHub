import { Header } from './Header';

export type HeaderProps = {
	headerData: Header,
	date: Date,
	use24Hour: boolean,
	degreesFormat: string,
	toggleRaspberrySettings: Function,
}