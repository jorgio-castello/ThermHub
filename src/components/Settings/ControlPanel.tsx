import React from 'react';
import { ControlPanelProps } from '../../interfaces/ControlPanelProps';
import SettingsButton from '../UserInterface/SettingsButton';

export default function ({ settings, setSettings }: ControlPanelProps) {
	const { degreesFormat, use24Hour } = settings;

	return (
		<div className="lg:inline-flex w-2/12 flex-col justify-center hidden">
			<div className="text-left text-5xl font-bold text-blue-600 tracking-tight">{`Therm\u00b0`}</div>
			<div className="py-5 bg-blue-100 bg-opacity-75 shadow-lg rounded-lg border border-solid border-indigo-200">
				<div className="ml-2 mb-2 font-light text-blue-500">Select a Location:</div>
				<input className="h-10 rounded-lg border border-solid border-gray-300 w-3/4 ml-2 pl-2 font-thin shadow-lg" type="text" placeholder="Enter a city" />
				<div className="ml-2 mt-5 mb-2 font-light text-blue-500">Temperature format:</div>
				<div className="flex flex-row ml-2 flex-wrap">
					{['Fahrenheit', 'Celsius', 'Kelvin'].map((degrees: string, idx: number) => (
						<SettingsButton
							active={degreesFormat === degrees}
							size="lg- px-5 py-2 m-1"
							onClick={() => setSettings(settings, 'degreesFormat', degrees)}>
							{degrees}
						</SettingsButton>
					))}
				</div>
				<div className="ml-2 mt-5 mb-2 font-light text-blue-500">Time format:</div>
				<div className="flex flex-row ml-2">
					<SettingsButton active={use24Hour} size="lg- px-5 py-2 m-1" onClick={() => setSettings(settings, 'use24Hour', true)}>12H</SettingsButton>
					<SettingsButton active={!use24Hour} size="lg- px-5 py-2 m-1" onClick={() => setSettings(settings, 'use24Hour', false)}>24H</SettingsButton>
				</div>
			</div>
		</div>
	)
}