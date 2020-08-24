import React from 'react';
import { Calendar, ForecastTileProps } from '../../interfaces';
import { generateForecastStr } from '../../helpers';

function WeatherForecastTile(props: ForecastTileProps) {
	let date = new Date();
	if (props.forecast.date) {
		date = new Date(props.forecast.date);
	}
	let dayStr = Calendar.daysOfWeek[date.getDay()];
	const forecast = generateForecastStr(props.forecast.day_temperature, props.forecast.night_temperature, props.degreesFormat);
	return (
		<div className="flex flex-col lg:w-40 h-20 w-20 shadow-md rounded-lg bg-white text-center font-thin lg:justify-between justify-around">
			<div className="flex flex-col lg:h-12 h-6 text-blue-300 font-normal">
				{window.innerWidth > 800 ? dayStr : dayStr[0]}
			</div>
			<div className="flex h-12 justify-center items-center">
				{forecast}
			</div>
		</div>
	);
}

export default WeatherForecastTile;