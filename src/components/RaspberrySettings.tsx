import React from 'react';
import { RaspberrySettingsProps } from '../interfaces';
import { activeBtnStateSm, inactiveBtnStateSm } from '../assets/cssClasses';

export default function ({ degreesFormat, use24Hour, setTemperatureFormat, setTimeFormat }: RaspberrySettingsProps) {
	return (
		<div className="flex h-40 bg-white bg-opacity-50 mt-3 rounded-lg">
			<div className="w-1/2 flex flex-col h-full justify-start pl-5 pt-5">
				<div className="text-left text-3xl font-bold text-blue-600 tracking-tight">{`Therm\u00b0`}</div>
				<input className="h-10 rounded-lg border border-solid border-gray-300 w-10/12 pl-2 font-thin shadow-lg" type="text" placeholder="Enter a city" />
			</div>
			<div className="w-1/2 flex flex-col justify-center">
				<div className="h-20 flex flex-col justify-center">
					<div className="font-light text-blue-500 text-sm">Temperature format:</div>
					<div className="flex flex-row flex-wrap mt-1">
						<button className={degreesFormat === 'Fahrenheit' ? activeBtnStateSm : inactiveBtnStateSm} onClick={() => setTemperatureFormat({ degreesFormat: 'Fahrenheit' })}>Fahrenheit</button>
						<button className={degreesFormat === 'Celsius' ? activeBtnStateSm : inactiveBtnStateSm} onClick={() => setTemperatureFormat({ degreesFormat: 'Celsius' })}>Celsius</button>
						<button className={degreesFormat === 'Kelvin' ? activeBtnStateSm : inactiveBtnStateSm} onClick={() => setTemperatureFormat({ degreesFormat: 'Kelvin' })}>Kelvin</button>
					</div>
				</div>
				<div className="h-20 flex flex-col justify-center">
					<div className="font-light text-blue-500 text-sm">Time format:</div>
					<div className="flex flex-row mt-1">
						<button className={use24Hour ? inactiveBtnStateSm : activeBtnStateSm} onClick={() => setTimeFormat({ use24Hour: false })}>12H</button>
						<button className={use24Hour ? activeBtnStateSm : inactiveBtnStateSm} onClick={() => setTimeFormat({ use24Hour: true })}>24H</button>
					</div>
				</div>
			</div>
		</div>
	);
}