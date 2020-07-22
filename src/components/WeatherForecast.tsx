import React from 'react';

function WeatherForecast() {
    return (
        <div className="flex flex-row w-10/12 mx-auto py-5 bg-gray-400 rounded-lg shadow-lg items-center justify-around bg-opacity-25">
          <div className="w-40 h-40 shadow-md rounded-lg bg-white bg-opacity-100"></div>
          <div className="w-40 h-40 shadow-md rounded-lg bg-white bg-opacity-100"></div>
          <div className="w-40 h-40 shadow-md rounded-lg bg-white bg-opacity-100"></div>
          <div className="w-40 h-40 shadow-md rounded-lg bg-white bg-opacity-100"></div>
          <div className="w-40 h-40 shadow-md rounded-lg bg-white bg-opacity-100"></div>
          <div className="w-40 h-40 shadow-md rounded-lg bg-white bg-opacity-100"></div>
          <div className="w-40 h-40 shadow-md rounded-lg bg-white bg-opacity-100"></div>
        </div>
    );
}

export default WeatherForecast;