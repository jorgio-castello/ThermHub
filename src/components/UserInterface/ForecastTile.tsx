import React from 'react';
import classnames from 'classnames';

interface ForecastTileProps {
  date: string,
  forecast: string | JSX.Element,
}

function ForecastTileUI({ date, forecast }: ForecastTileProps) {
  return (
    <div className={classnames("flex flex-col lg:w-40 h-20 w-20 shadow-md rounded-lg bg-white text-center font-thin lg:justify-between justify-around")}>
      <div className={classnames("flex flex-col lg:h-12 h-6 text-blue-300 font-normal")}>
        {date}
      </div>
      <div className={classnames("flex h-12 justify-center items-center")}>
        {forecast}
      </div>
    </div>
  )
}

export default ForecastTileUI;