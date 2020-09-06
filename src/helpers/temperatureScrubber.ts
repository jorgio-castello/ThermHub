export default function (temp: number, degreesFormat: string): number {
	if (temp === -1000) {
		return -1000;
	}

	if (temp < 100) { // temporary fix, due to weather.gov sending back data below 100
		temp *= 10;
	}

	if (degreesFormat === 'C') degreesFormat = 'Celsius';
	if (degreesFormat === 'F') degreesFormat = 'Fahrenheit';
	if (degreesFormat === 'K') degreesFormat = 'Kelvin';

	switch (degreesFormat) {
		case 'Celsius':
			temp = Math.round(((5 / 9) * (temp - 32))) / 10;
			break;
		case 'Kelvin':
			temp = (Math.round(((5 / 9) * (temp - 32))) / 10) + 273;
			break;
		case 'Fahrenheit':
			temp /= 10;
			break;
	}

	return Math.floor(temp);
}