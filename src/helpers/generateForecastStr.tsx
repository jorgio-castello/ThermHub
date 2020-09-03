import React from 'react';
import scrubTemperature from './temperatureScrubber';
import { ReactComponent as SunSvg } from '../assets/svgs/sun.svg';
import { ReactComponent as MoonSvg } from '../assets/svgs/moon.svg';

export const generateForecastStr = (dayTimeTemp: number, nightTimeTemp: number, degreesFormat: string) => {
	const day_time_temp: number = scrubTemperature(dayTimeTemp, degreesFormat);
	const night_time_temp: number = scrubTemperature(nightTimeTemp, degreesFormat);

	const dayTimeStr = day_time_temp !== -1000 ? (
		<div className="flex lg:p-2 p-0 items-center justify-center lg:text-base text-sm">
			<SunSvg className="inline-block lg:w-5 lg:h-5 w-3 h-3 mr-1" />
			{`${day_time_temp}\u00b0${degreesFormat[0]}`}
		</div>
	) : '';

	const nightTimeStr = night_time_temp !== -1000 ? (
		<div className="flex flex-row lg:p-2 p-0 items-center justify-center lg:text-base text-sm">
			<MoonSvg className="inline-block lg:w-5 lg:h-5 w-3 h-3 mr-1" />
			{`${night_time_temp}\u00b0${degreesFormat[0]}`}
		</div>
	) : '';

	if (dayTimeStr && nightTimeStr) {
		return (
			<div className="flex flex-col lg:flex-row items-center justify-around">
				{dayTimeStr}
				{nightTimeStr}
			</div>
		)
	}
	return dayTimeStr || nightTimeStr;
}
