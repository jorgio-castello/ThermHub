import React from 'react';
import WeatherForecastTile from './WeatherForecastTile';
import Forecast from '../interfaces/Forecast';

interface ForecastProps {
  forecastData: Forecast[],
}

function WeatherForecast(props: ForecastProps) {
    const data = props.forecastData.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
  
    return (
        <>
          <div className="flex flex-col">
            <div className="inline-flex w-2/12 pl-1 font-thin text-white bg-indigo-700 text-lg justify-center mb-2 p-2 rounded-lg bg-opacity-75 shadow-lg">Weather Forecast</div>
          </div>
          <div className="flex flex-row p-5 rounded-lg shadow-lg items-center justify-around bg-blue-100 bg-opacity-75 border border-solid border-indigo-200">
            {data.map((forecast, index) => <WeatherForecastTile forecast={forecast} key={index}/>)}
          </div>
        </>
    );
}

export default WeatherForecast;