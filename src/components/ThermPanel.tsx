import React from 'react';
import ThermPanelChild from './ThermPanelChild';
import Therma from '../interfaces/Therm';

interface ThermaProps {
    thermostatData: Therma[],
}

function ThermPanel(props: ThermaProps) {
    return (
        <div className="flex flex-row w-10/12 mx-auto py-5 px-1 rounded-lg shadow-lg justify-around">
            { props.thermostatData.map((thermostat, index) => <ThermPanelChild thermostat={thermostat} key={index} />) }
        </div>
    );
}

export default ThermPanel;