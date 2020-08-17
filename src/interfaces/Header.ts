export type  Header = {
    city: string,
    state: string,
    temperature: number,
}

export function generateHeader(city:string, state:string, temperature?: number):Header {
    return {
        city,
        state,
        temperature: temperature ?? 0,
    }
}