import React from 'react';
import { RaspberrySettingsProps } from '../../interfaces/RaspberrySettingsProps';
import SettingsButton from '../UserInterface/SettingsButton';

export default function ({ settings, setSettings }: RaspberrySettingsProps) {
	const { degreesFormat, use24Hour, thermInterval } = settings;
	return (
		<div className="flex flex-col h-auto bg-white bg-opacity-50 mt-3 rounded-lg sm:flex-row ">
			<div className="w-full flex flex-col h-full justify-start pl-5 pt-5 sm:w-1/2">
				<div className="text-left text-3xl font-bold text-blue-600 tracking-tight">{`Therm\u00b0`}</div>
				<input className="h-10 rounded-lg border border-solid border-gray-300 w-10/12 pl-2 font-thin shadow-lg" type="text" placeholder="Enter a city" />
			</div>
			<div className="w-full flex flex-col justify-around pl-6 pt-3 pb-5 sm:py-2 sm:pr-5 sm:w-1/2">
				<div className="flex flex-row items-center justify-between mt-1">
					<div className="w-1/12 font-light text-blue-500 text-sm mr-2">Temperature:</div>
					<div className="w-8/12">
						{[`${`F\u00b0`}`, `${`C\u00b0`}`, `${`K\u00b0`}`].map((degrees: string, idx: number) => (
							<SettingsButton
								active={degreesFormat[0] === degrees[0]}
								size=" h-8 w-12 mr-1"
								onClick={() => setSettings(settings, 'degreesFormat', degrees[0])}>
								{degrees}
							</SettingsButton>
						))}
					</div>
				</div>
				<div className="flex flex-row my-3 items-center justify-between flex-wrap">
					<div className="w-1/12 font-light text-blue-500 text-sm mr-2">Time:</div>
					<div className="w-8/12 justify-start">
						<SettingsButton active={use24Hour} size=" h-8 w-12 mr-1" onClick={() => setSettings(settings, 'use24Hour', true)}>12H</SettingsButton>
						<SettingsButton active={!use24Hour} size=" h-8 w-12 mr-1" onClick={() => setSettings(settings, 'use24Hour', false)}>24H</SettingsButton>
					</div>
				</div>
				<div className="flex flex-row items-center flex-wrap justify-between">
					<div className="w-1/12 font-light text-blue-500 text-sm mr-2">Interval:</div>
					<div className="w-8/12 sm:w-auto justify-start">
						<SettingsButton active={thermInterval === 289} size=" h-8 w-12 mr-1 mb-1" onClick={() => setSettings(settings, 'thermInterval', 289)}>24H</SettingsButton>
						<SettingsButton active={thermInterval === 145} size=" h-8 w-12 mr-1" onClick={() => setSettings(settings, 'thermInterval', 145)}>12H</SettingsButton>
						<SettingsButton active={thermInterval === 73} size=" h-8 w-12 mr-1" onClick={() => setSettings(settings, 'thermInterval', 73)}>6H</SettingsButton>
						<SettingsButton active={thermInterval === 13} size=" h-8 w-12 mr-1" onClick={() => setSettings(settings, 'thermInterval', 13)}>1H</SettingsButton>
						<SettingsButton active={thermInterval === 7} size=" h-8 w-12 mr-1" onClick={() => setSettings(settings, 'thermInterval', 7)}>30M</SettingsButton>
					</div>
				</div>
			</div>
		</div>
	);
}