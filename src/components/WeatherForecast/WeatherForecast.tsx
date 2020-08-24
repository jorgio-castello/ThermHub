import React from 'react';
import WeatherForecastTile from './WeatherForecastTile';
import { ForecastProps } from '../../interfaces';

function WeatherForecast(props: ForecastProps) {
	let data = props.forecastData.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
	return (
		<>
			<div className="lg:flex flex-col mt-10 hidden">
				<div className="w-2/12 font-thin text-white bg-indigo-700 text-lg justify-center mb-2 p-2 rounded-lg bg-opacity-75 shadow-lg text-center">Weather Forecast</div>
			</div>
			<div className="flex flex-row lg:p-5 rounded-lg lg:shadow-lg items-center justify-between lg:bg-blue-100 lg:bg-opacity-75 lg:border lg:border-solid lg:border-indigo-200">
				{data.map((forecast, index) => <WeatherForecastTile forecast={forecast} key={index} degreesFormat={props.degreesFormat} />)}
			</div>
		</>
	);
}

export default WeatherForecast;