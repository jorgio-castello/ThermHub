import React from 'react';
import ThermPanelChild from './ThermPanelChild';
import { ThermModalProps, Therm } from '../interfaces';
import { activeModalBtn, inactiveModalBtn } from '../assets/cssClasses';

export default function ThermModal(props: ThermModalProps) {
	let pastData = (therma: Therm) => props.past.filter((theTherma) => therma.name === theTherma.name);
	const timelines: string[] = ['24h', '12h', '6hr', '1hr', '30m'];
	const intervals: number[] = [289, 145, 73, 13, 7];
	return (
		<div className="w-full bg-gray-300 z-10 absolute top-0 left-0">
			<div className="h-screen flex flex-row justify-around lg:justify-center items-center p-5">
				<div className="flex flex-col lg:w-1/4 w-5/12 bg-blue-500 bg-opacity-75 rounded-lg p-5 shadow-xl justify-around lg:mr-10">
					<div className="text-center font-thin text-xl bg-indigo-600 p-3 rounded-lg text-white shadow-lg">{props.therm.name}</div>
					<div className="flex flex-row justify-around mt-5">
						{timelines.map((timeline, index) => (
							<button className={props.thermInterval === intervals[index] ? activeModalBtn : inactiveModalBtn} onClick={() => props.setThermInterval(intervals[index])}>
								{timeline}
							</button>
						))}
					</div>
					<button className="bg-red-600 bg-opacity-75 p-3 mt-10 text-xl rounded-lg text-white font-thin lg:mt-20" onClick={() => props.updateModalDisplay()}>Close</button>
				</div>
				<ThermPanelChild thermostat={props.therm} updateModalDisplay={() => { }} width="1/2" degreesFormat={props.degreesFormat} use24Hour={props.use24Hour} past={pastData(props.therm)} showThermModal={props.showThermModal} isModal={true} thermInterval={props.thermInterval} />
			</div>
		</div>
	);
}

