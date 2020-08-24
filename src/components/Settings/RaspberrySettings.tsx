import React from 'react';
import { RaspberrySettingsProps } from '../../interfaces';
import { activeBtnStateSm, inactiveBtnStateSm } from '../../assets/cssClasses';

export default function ({ degreesFormat, use24Hour, setTemperatureFormat, setTimeFormat, thermInterval, setThermInterval }: RaspberrySettingsProps) {
	return (
		<div className="flex h-40 bg-white bg-opacity-50 mt-3 rounded-lg">
			<div className="w-1/2 flex flex-col h-full justify-start pl-5 pt-5">
				<div className="text-left text-3xl font-bold text-blue-600 tracking-tight">{`Therm\u00b0`}</div>
				<input className="h-10 rounded-lg border border-solid border-gray-300 w-10/12 pl-2 font-thin shadow-lg" type="text" placeholder="Enter a city" />
			</div>
			<div className="w-1/2 flex flex-col justify-around py-2 pr-5">
				<div className="flex flex-row items-center justify-between mt-1">
					<div className="w-1/12 font-light text-blue-500 text-sm mr-2">Temperature:</div>
					<div className="w-8/12">
						<button className={degreesFormat === 'Fahrenheit' ? activeBtnStateSm : inactiveBtnStateSm} onClick={() => setTemperatureFormat({ degreesFormat: 'Fahrenheit' })}>{`F\u00b0`}</button>
						<button className={degreesFormat === 'Celsius' ? activeBtnStateSm : inactiveBtnStateSm} onClick={() => setTemperatureFormat({ degreesFormat: 'Celsius' })}>{`C\u00b0`}</button>
						<button className={degreesFormat === 'Kelvin' ? activeBtnStateSm : inactiveBtnStateSm} onClick={() => setTemperatureFormat({ degreesFormat: 'Kelvin' })}>{`K\u00b0`}</button>
					</div>
				</div>
				<div className="flex flex-row mt-1 items-center justify-between flex-wrap">
					<div className="w-1/12 font-light text-blue-500 text-sm mr-2">Time:</div>
					<div className="w-8/12 justify-start">
						<button className={use24Hour ? activeBtnStateSm : inactiveBtnStateSm} onClick={() => setTimeFormat({ use24Hour: true })}>24H</button>
						<button className={use24Hour ? inactiveBtnStateSm : activeBtnStateSm} onClick={() => setTimeFormat({ use24Hour: false })}>12H</button>
					</div>
				</div>
				<div className="flex flex-row mt-1 items-center flex-wrap justify-between">
					<div className="w-1/12 font-light text-blue-500 text-sm mr-2">Interval:</div>
					<div className="w-auto justify-start">
						<button className={thermInterval === 289 ? activeBtnStateSm : inactiveBtnStateSm} onClick={() => setThermInterval(289)}>24H</button>
						<button className={thermInterval === 145 ? activeBtnStateSm : inactiveBtnStateSm} onClick={() => setThermInterval(145)}>12H</button>
						<button className={thermInterval === 73 ? activeBtnStateSm : inactiveBtnStateSm} onClick={() => setThermInterval(73)}>6H</button>
						<button className={thermInterval === 13 ? activeBtnStateSm : inactiveBtnStateSm} onClick={() => setThermInterval(13)}>1H</button>
						<button className={thermInterval === 7 ? activeBtnStateSm : inactiveBtnStateSm} onClick={() => setThermInterval(7)}>30M</button>
					</div>
				</div>
			</div>
		</div>
	);
}