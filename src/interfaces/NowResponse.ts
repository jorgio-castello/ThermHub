import { Forecast, Therm } from "./";

export interface NowResponse {
	forecast_daily: Forecast[],
	thermostats: Therm[],
}
