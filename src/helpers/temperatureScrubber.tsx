export default function(temp: number, degreesFormat: string):number|undefined {
    if (temp === -1000) {
        return undefined;
    }

    switch(degreesFormat) {
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