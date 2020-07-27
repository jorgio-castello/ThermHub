import React from 'react';

interface WeatherForecastProps {
    day: string,
}

function WeatherForecastTile(props: WeatherForecastProps) {
    return (
        <div className="flex flex-col w-40 h-40 shadow-md rounded-lg bg-white text-center pt-3 font-thin justify-around">
            <div>{props.day}</div>
            <div className="p-3 bg-teal-400 text-white">Graphic Placeholder</div>
            <div>56 / 92</div>
        </div>
    );
}

export default WeatherForecastTile;