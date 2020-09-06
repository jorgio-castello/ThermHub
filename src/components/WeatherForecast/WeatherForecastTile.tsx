import React from 'react';
import Calendar from '../../interfaces/Calendar';
import ForecastTileUI from '../UserInterface/ForecastTile';
import { ForecastTileProps } from '../../interfaces/ForecastTileProps'
import { generateForecastStr } from '../../helpers/generateForecastStr';

function WeatherForecastTile(props: ForecastTileProps) {
	const forecast = generateForecastStr(props.forecast.day_temperature, props.forecast.night_temperature, props.degreesFormat);

	let date = new Date();
	if (props.forecast.date) date = new Date(props.forecast.date);
	let dayStr = Calendar.daysOfWeek[date.getDay()];
	dayStr = window.innerWidth > 800 ? dayStr : dayStr[0];

	return (
		<ForecastTileUI date={dayStr} forecast={forecast} />
	);
}

export default WeatherForecastTile;