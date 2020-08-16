import React from 'react';
import ThermPanelChild from './ThermPanelChild';
import Therma from '../interfaces/Therm';

interface ThermModalProps {
    therma: Therma,
    updateModalDisplay: Function,
    degreesFormat: string,
    use24Hour: boolean,
}

interface timelineProps {
    timeline: string,
}

const timelines:string[] = ['1w', '48h', '24h', '12h', '6hr', '1hr', '30m'];

export default function ThermModal(props: ThermModalProps) {
    console.log(props.therma);
    return (
        <div className="w-full bg-gray-900 bg-opacity-75 z-10 absolute top-0 left-0">
            <div className="h-screen flex flex-row justify-center items-center">
            <div className="flex flex-col w-1/4 bg-blue-500 bg-opacity-75 mr-10 rounded-lg p-5 shadow-xl justify-around">
            <div className="text-center font-thin text-xl bg-indigo-600 p-3 rounded-lg text-white shadow-lg">{props.therma.name} - Control Center</div>
                <div className="flex flex-row justify-around mt-5">
                    {timelines.map((timeline, index) => (
                        <button className={`bg-teal-500 py-2 w-12 rounded-lg shadow-lg text-white`}>
                            {timeline}
                        </button>
                    ))}
                </div>
                <button className="bg-red-600 bg-opacity-75 p-3 mt-20 text-xl rounded-lg text-white font-thin " onClick={() => props.updateModalDisplay()}>Close</button>
            </div>      
                <ThermPanelChild thermostat={props.therma} updateModalDisplay={() => {}} width="1/2" degreesFormat={props.degreesFormat} use24Hour={props.use24Hour} />
            </div>
        </div>
    );
}

