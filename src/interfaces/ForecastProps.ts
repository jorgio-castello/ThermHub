import { Forecast } from "./Forecast";
import Settings from "./Settings";

export type ForecastProps = {
	forecastData: Forecast[],
	settings: Settings,
}