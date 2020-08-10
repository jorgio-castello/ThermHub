import React from 'react';
import {Line} from 'react-chartjs-2';
import scrubTemperature from '../helpers/temperatureScrubber';
import { ReactComponent as PlusSvg } from '../assets/svgs/plus.svg';
import ThermChildProps from '../interfaces/ThermChildProps';

const state = {
    labels: ['12:00', '2:00', '4:00',
             '6:00', '8:00', '10:00', '12:00'],
    datasets: [
      {
        fill: false,
        lineTension: .5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: '#79E3CF',
        data: [65, 59, 80, 81, 56, 61, 64],
      }
    ]
  }

function ThermPanelChild(props:ThermChildProps) {
    const termperature = scrubTemperature(props.thermostat.temperature);
    
    return (
        <button id={props.id} type="button" className={`bg-white shadow-lg rounded-lg flex flex-col justify-around px-1 py-2 w-${props.width}`} onClick={(e) => props.updateModalDisplay(e)}>
            <div className="px-2 flex flex-row h-24 justify-between items-center content-center my-2 rounded-lg w-full">
                <div className="flex flex-col items-start">
                    <div className="flex flex-row rounded-lg text-blue-500 text-center text-lg py-1 font-thin items-center">
                        {props.thermostat.name}
                        <PlusSvg className="ml-1 w-5 h-5"/>
                    </div>
                    <div className="bg-teal-400 px-2 py-1 rounded-full text-xs text-white mt-1">Madison, WI</div>
                </div>
                <div className="text-5xl font-thin text-gray-600">
                    {`${termperature}\u00b0`}
                </div>
            </div>
            <div className="w-full mx-auto">
                <Line
                    data={state}
                    options={{
                        title: { 
                        display:false,
                        },
                        legend: {
                        display:false,
                        },
                        scales: {
                            xAxes: [{
                               gridLines: {
                                  display: false,
                                  color: '#CDFCE5',
                               },
                               ticks: {
                                   display: true,
                                   fontFamily: 'system-ui',
                                   fontSize: 10,
                               }
                            }],
                            yAxes: [{
                               gridLines: {
                                  display: true,
                                  color: '#CDFCE5',
                               },
                               ticks: {
                                   display: true,
                                   fontFamily: 'system-ui',
                                   fontSize: 10,
                               }
                            }]
                       },
                       responsive: true,
                       maintainAspectRatio: true
                    }}
                />
            </div>
        </button>
    );
}

export default ThermPanelChild;