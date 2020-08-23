import React from 'react';
import { ReactComponent as PlusSvg } from '../assets/svgs/plus.svg';
import { ThermChildProps, Therm } from '../interfaces';
import { scrubTemperature } from '../helpers';

interface ThermChildHeaderProps {
	thermostat: Therm,
	degreesFormat: string,
}

export default function (props: ThermChildHeaderProps) {
	const temperature = scrubTemperature(props.thermostat.temperature, props.degreesFormat);
	return (
		<div className={`px-4 flex justify-between h-16 lg:h-24 items-center content-center lg:my-2 rounded-lg w-full`}>
			<div className="flex flex-col items-start">
				<div className="flex rounded-lg text-blue-500 text-center text-lg lg:py-1 font-thin items-center">
					{props.thermostat.name}
					<PlusSvg className="ml-1 lg:w-5 lg:h-5 w-4 h-4" />
				</div>
				<div className="bg-teal-400 px-2 py-1 rounded-full text-xs text-white mt-1 lg:block hidden">Madison, WI</div>
			</div>
			<div className="content-center">
				<div className="lg:text-5xl text-3xl font-thin text-teal-300 lg:h-16 h-12 lg:ml-0 ml-2">
					{`${temperature}\u00b0${props.degreesFormat[0]}`}
				</div>
				{!props.thermostat.is_hygrostat ? null : (<>
					<div className="h-4 text-gray-500 font-thin lg:text-lg lg:block hidden">
						{props.thermostat.relative_humidity}% RH
          </div>
				</>)}
			</div>
		</div >
	);
}