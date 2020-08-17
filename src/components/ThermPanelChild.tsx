import React from 'react';
import {ThermChildProps} from '../interfaces';
import { getDate, formatTime, scrubTemperature } from '../helpers';
import { Line } from 'react-chartjs-2';
import { ReactComponent as PlusSvg } from '../assets/svgs/plus.svg';

let startingTime: Date | number | undefined = getDate(); // 30 min ago
let startingTimeMS = startingTime ? startingTime.getTime() - 1800000 : 1;
startingTime = new Date(startingTimeMS);
while (startingTime.getMinutes() % 5 !== 0) {
    startingTimeMS -= 60000;
    startingTime = new Date(startingTimeMS);
}

startingTime = startingTime.getTime();

const timeData = [startingTime, startingTime + 300000, startingTime + 600000, startingTime + 900000, startingTime + 1200000];
const temperatureData = [65, 59, 80, 81, 56];

function ThermPanelChild(props: ThermChildProps) {
    const temperature = scrubTemperature(props.thermostat.temperature, props.degreesFormat);

    // const state = {
    //     labels: timeData.map(time => formatTime(props.use24Hour, new Date(time), true)),
    //     datasets: [
    //         {
    //             fill: false,
    //             lineTension: .5,
    //             backgroundColor: 'rgba(75,192,192,1)',
    //             borderColor: '#79E3CF',
    //             data: temperatureData.map(temp => scrubTemperature(temp * 10, props.degreesFormat)),
    //         }
    //     ]
    // }
    let data = {
        labels: timeData.map(time => formatTime(props.use24Hour, new Date(time), true)),
        datasets: [{
            label: 'deg F',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: '#79E3CF',
            // data: props.past.map(therm => scrubTemperature(therm.temperature * 10, props.degreesFormat)),
            data: temperatureData.map(temp => scrubTemperature(temp * 10, props.degreesFormat)),
            yAxisID: 't',
        }],
    }
    let yAxes = [{
        gridLines: {
            display: true,
            color: '#CDFCE5',
        },
        ticks: {
            display: true,
            fontFamily: 'system-ui',
            fontSize: 10,
        },
        id: 't',
    }];

    // if (props.thermostat.is_hygrostat) {
    //     data.datasets.push({
    //         label: '%RH',
    //         fill: false,
    //         lineTension: 0.5,
    //         backgroundColor: 'rgba(75,192,192,1)',
    //         borderColor: 'red',
    //         data: props.past.map(therm => therm.relative_humidity),
    //         yAxisID: 'rh',
    //     });
    //     yAxes.push({
    //         gridLines: {
    //            display: true,
    //            color: '#CDFCE5',
    //         },
    //         ticks: {
    //             display: true,
    //             fontFamily: 'system-ui',
    //             fontSize: 10,
    //         },
    //         id: 'rh',
    //      });
    // }

    // const showGraphData = window.innerWidth > 800 || props.showThermModal;
    const showGraphData = true;

    return (
        <button id={props.id} type="button" className={`bg-white bg-opacity-100 shadow-lg rounded-lg flex flex-col justify-around lg:mr-5 py-4 w-56 h-56 lg:h-full lg:w-${props.width}`} onClick={(e) => props.updateModalDisplay(e)}>
            <div className={`px-4 flex justify-between h-18 lg:h-24 items-center content-center lg:my-2 rounded-lg w-full`}>
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
            </div>
            <div className={`lg:w-full w-11/12 h-56 mx-auto lg:px-4 ${showGraphData ? '' : 'hidden'}`}>
                <Line
                    data={data}
                    options={{
                        title: {
                            display: false,
                        },
                        legend: {
                            display: false,
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
                            yAxes,
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                    }}
                />
            </div>
        </button>
    );
}

export default ThermPanelChild;