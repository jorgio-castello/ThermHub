export default function(temp: number):number|undefined {
    if (temp === -1000) {
        return undefined;
    }

    return temp > 300 ? temp / 10 : temp;
}