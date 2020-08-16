import React from 'react';
import Forecast from '../interfaces/Forecast';
import { daysOfWeek } from '../interfaces/Calendar';
import scrubTemperature from '../helpers/temperatureScrubber';
import { ReactComponent as SunSvg } from '../assets/svgs/sun.svg';
import { ReactComponent as MoonSvg } from '../assets/svgs/moon.svg';

interface WeatherForecastProps {
    forecast: Forecast,
    degreesFormat: string,
}

const generateForecast = (dayTimeTemp: number, nightTimeTemp: number, degreesFormat: string) => {
    const day_time_temp:number|undefined = scrubTemperature(dayTimeTemp, degreesFormat);
    const night_time_temp:number|undefined = scrubTemperature(nightTimeTemp, degreesFormat);   
    
    const dayTimeStr = day_time_temp ? (
        <div className="flex flex-row p-2 items-center justify-center">
            <SunSvg className="inline-block w-5 h-5 mr-1"/>
            {`${day_time_temp}\u00b0${degreesFormat[0]}`}
        </div>
    ) : '';

    const nightTimeStr = night_time_temp ? (
        <div className="flex flex-row p-2 items-center justify-center">
            <MoonSvg className="inline-block w-5 h-5 mr-1"/>
            {`${night_time_temp}\u00b0${degreesFormat[0]}`}
        </div>
    ) : '';
    
    if (dayTimeStr && nightTimeStr) {
        return (
            <div className = "flex flex-row items-center justify-around">
                {dayTimeStr}
                {nightTimeStr}
            </div>
        )
    }
    return dayTimeStr || nightTimeStr;
}

function WeatherForecastTile(props: WeatherForecastProps) {
    let date = new Date();
    if (props.forecast.date) {
        date = new Date(props.forecast.date);
    }
    
    const forecast = generateForecast(props.forecast.day_temp, props.forecast.night_temp, props.degreesFormat);

    return (
        <div className="flex flex-col w-40 h-24 shadow-md rounded-lg bg-white text-center pt-3 font-thin justify-around">
            <div>{daysOfWeek[date.getDay()]}</div>
            <div>{forecast}</div>
        </div>
    );
}

export default WeatherForecastTile;