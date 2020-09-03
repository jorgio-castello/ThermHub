import { Forecast } from './Forecast';
import { Therm } from './Therm';

export interface NowResponse {
	forecast_daily: Forecast[],
	thermostats: Therm[],
}
