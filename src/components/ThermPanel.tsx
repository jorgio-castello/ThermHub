import React from 'react';
import ThermPanelChild from './ThermPanelChild';
import Therma from '../interfaces/Therm';

interface ThermaProps {
    thermostatData: Therma[],
    expandThermPanel: Function,
    pastData: Therma[],
}

function ThermPanel(props: ThermaProps) {
    let pastData = (therma: Therma) => props.pastData.filter(theTherma => therma.name === theTherma.name);
    return (
        <>
            <div className="flex flex-col mt-10">
            <div className="flex flex-col">
                <div className="inline-flex w-1/4 pl-1 font-thin text-white bg-indigo-700 justify-center mb-2 p-2 rounded-lg bg-opacity-75 shadow-lg text-lg">Thermostat Readings</div>
            </div>
            </div>
            <div className="flex flex-row p-5 rounded-lg shadow-lg bg-blue-100 bg-opacity-75 mb-10 justify-start border border-solid border-indigo-200">
                {props.thermostatData.map((thermostat, index) => 
                    <ThermPanelChild thermostat={thermostat} past={pastData(thermostat)} width="1/4" key={index} id={index} updateModalDisplay={props.expandThermPanel} />)
                }
            </div>
        </>
    );
}

export default ThermPanel;