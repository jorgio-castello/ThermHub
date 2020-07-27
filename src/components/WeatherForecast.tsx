import React from 'react';
import WeatherForecastTile from './WeatherForecastTile';
import Forecast from '../interfaces/Forecast';

interface ForecastProps {
  forecastData: Forecast[],
}

function WeatherForecast(props: ForecastProps) {
    const data = props.forecastData.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
  
    return (
        <div className="flex flex-row w-10/12 mx-auto py-5 rounded-lg shadow-lg items-center justify-around">
          {data.map((forecast, index) => <WeatherForecastTile forecast={forecast} key={index}/>)}
        </div>
    );
}

export default WeatherForecast;