import React from 'react';
import ThermPanelChild from './ThermPanelChild';
import {Therm, ThermPanelProps} from '../interfaces';

function ThermPanel(props: ThermPanelProps) {
    let pastData = (therma: Therm) => props.pastData.filter((theTherma) => therma.name === theTherma.name);
    return (
        <div className="my-3 lg:my-0">
            <div className="flex-col mt-10 lg:flex hidden">
                <div className="flex flex-col">
                    <div className="inline-flex w-1/4 pl-1 font-thin text-white bg-indigo-700 justify-center mb-2 p-2 rounded-lg bg-opacity-75 shadow-lg text-lg">Thermostat Readings</div>
                </div>
            </div>
            <div className="flex flex-row lg:p-5 rounded-lg lg:shadow-lg lg:bg-blue-100 lg:bg-opacity-75 justify-between lg:justify-start lg:border lg:border-solid lg:border-indigo-200">
                {props.thermostatData.map((thermostat, index) => <ThermPanelChild thermostat={thermostat} width="1/3" key={index} id={index} updateModalDisplay={props.expandThermPanel} degreesFormat={props.degreesFormat} use24Hour={props.use24Hour} past={pastData(thermostat)} showThermModal={props.showThermModal} />)}
            </div>
        </div>
    );
}

export default ThermPanel;