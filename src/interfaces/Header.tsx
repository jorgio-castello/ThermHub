export default interface Header {
    city: string,
    state: string,
    date: Date,
    time: string,
    temperature: number,
}

export function generateHeader(city:string, state:string, temperature?: number, date?: Date, time?: string):Header {
    return {
        city,
        state,
        temperature: temperature ?? 0,
        date: date ?? new Date(),
        time: time ?? '',
    }
}