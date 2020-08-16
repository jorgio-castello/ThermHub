import Therma from "./Therm";
import Forecast from "./Forecast";

export interface NowResponse {
    forecast: Forecast[],
    thermostats: Therma[],
}
