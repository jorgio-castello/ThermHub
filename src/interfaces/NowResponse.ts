import {Forecast, Therm} from "./";

export interface NowResponse {
    forecast: Forecast[],
    thermostats: Therm[],
}
