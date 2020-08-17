import React from 'react';
import { ControlPanelProps } from '../interfaces';
import { activeBtnState, inactiveBtnState } from '../assets/cssClasses';

export default function ({ degreesFormat, use24Hour, setTemperatureFormat, setTimeFormat }: ControlPanelProps) {
	return (
		<div className="lg:inline-flex w-2/12 flex-col justify-center hidden">
			<div className="text-left text-5xl font-bold text-blue-600 tracking-tight">{`Therm\u00b0`}</div>
			<div className="py-5 bg-blue-100 bg-opacity-75 shadow-lg rounded-lg border border-solid border-indigo-200">
				<div className="ml-2 mb-2 font-light text-blue-500">Select a Location:</div>
				<input className="h-10 rounded-lg border border-solid border-gray-300 w-3/4 ml-2 pl-2 font-thin shadow-lg" type="text" placeholder="Enter a city" />
				<div className="ml-2 mt-5 mb-2 font-light text-blue-500">Temperature format:</div>
				<div className="flex flex-row ml-2 flex-wrap">
					<button className={degreesFormat === 'Fahrenheit' ? activeBtnState : inactiveBtnState} onClick={() => setTemperatureFormat({ degreesFormat: 'Fahrenheit' })}>Fahrenheit</button>
					<button className={degreesFormat === 'Celsius' ? activeBtnState : inactiveBtnState} onClick={() => setTemperatureFormat({ degreesFormat: 'Celsius' })}>Celsius</button>
					<button className={degreesFormat === 'Kelvin' ? activeBtnState : inactiveBtnState} onClick={() => setTemperatureFormat({ degreesFormat: 'Kelvin' })}>Kelvin</button>
				</div>
				<div className="ml-2 mt-5 mb-2 font-light text-blue-500">Time format:</div>
				<div className="flex flex-row ml-2">
					<button className={use24Hour ? inactiveBtnState : activeBtnState} onClick={() => setTimeFormat({ use24Hour: false })}>12H</button>
					<button className={use24Hour ? activeBtnState : inactiveBtnState} onClick={() => setTimeFormat({ use24Hour: true })}>24H</button>
				</div>
			</div>
		</div>
	)
}