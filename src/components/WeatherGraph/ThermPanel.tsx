import React from 'react';
import ThermPanelChild from './ThermPanelChild';
import { Therm } from '../../interfaces/Therm';
import { ThermPanelProps } from '../../interfaces/ThermPanelProps';

function ThermPanel(props: ThermPanelProps) {
	const { use24Hour, degreesFormat, thermInterval } = props.settings;
	let pastData = (therma: Therm) => props.pastData.filter((theTherma) => therma.name === theTherma.name);
	return (
		<div className="my-3 lg:my-0">
			<div className="flex-col mt-10 lg:flex hidden">
				<div className="flex flex-col">
					<div className="inline-flex w-1/4 pl-1 font-thin text-white bg-indigo-700 justify-center mb-2 p-2 rounded-lg bg-opacity-75 shadow-lg text-lg">Thermostat Readings</div>
				</div>
			</div>
			<div className="flex flex-row lg:p-5 rounded-lg lg:shadow-lg lg:bg-blue-100 lg:bg-opacity-75 justify-between lg:justify-start lg:border lg:border-solid lg:border-indigo-200">
				{props.thermostatData.map((thermostat, index) => <ThermPanelChild thermostat={thermostat} width="1/3" key={index} id={index} updateModalDisplay={props.expandThermPanel} degreesFormat={degreesFormat} use24Hour={use24Hour} past={pastData(thermostat)} showThermModal={props.showThermModal} thermInterval={thermInterval} />)}
			</div>
		</div>
	);
}

export default ThermPanel;