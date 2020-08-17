import { Header } from './';

export type HeaderProps = {
	headerData: Header,
	date: Date,
	use24Hour: boolean,
	degreesFormat: string,
	toggleRaspberrySettings: Function,
}