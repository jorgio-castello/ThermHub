import React from 'react';
import WeatherForecastTile from './WeatherForecastTile';

const daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function WeatherForecast() {
    return (
        <div className="flex flex-row w-10/12 mx-auto py-5 rounded-lg shadow-lg items-center justify-around">
          {daysOfTheWeek.map((day, index) => <WeatherForecastTile day={day} key={index} />)} 
        </div>
    );
}

export default WeatherForecast;