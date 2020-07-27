import React from 'react';
import Forecast from '../interfaces/Forecast';

interface WeatherForecastProps {
    forecast: Forecast,
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function WeatherForecastTile(props: WeatherForecastProps) {
    let date = new Date();
    if (props.forecast.date) {
        date = new Date(props.forecast.date);
    }
    
    return (
        <div className="flex flex-col w-40 h-40 shadow-md rounded-lg bg-white text-center pt-3 font-thin justify-around">
            <div>{daysOfWeek[date.getDay()]}</div>
            <div className="p-3 bg-teal-400 text-white">Graphic Placeholder</div>
            <div>{`${props.forecast.day_temp}\u00b0 / ${props.forecast.night_temp}\u00b0`}</div>
        </div>
    );
}

export default WeatherForecastTile;