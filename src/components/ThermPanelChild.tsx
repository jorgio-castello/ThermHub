import React from 'react';
import {Line} from 'react-chartjs-2';

const state = {
    labels: ['12:00', '2:00', '4:00',
             '6:00', '8:00', '10:00', '12:00'],
    datasets: [
      {
        fill: true,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: [65, 59, 80, 81, 56, 61, 64],
      }
    ]
  }

function ThermPanelChild() {
    return (
        <div className="bg-white mx-auto shadow-lg rounded-lg flex flex-col justify-around px-1 py-2">
            <div className="bg-blue-500 rounded-lg text-white text-center text-lg py-1 font-light">
                Offline Outside
            </div>
            <div className="flex flex-row h-16 justify-between items-center content-center border-solid border-2 border-gray-200 my-2 rounded-lg">
                <div className="text-5xl font-thin text-gray-600 ml-2">
                    {`69\u00b0`}
                </div>
                <div className="bg-teal-600 text-white font-light text-lg text-center rounded-lg content-center py-1 px-4 mr-2">On</div>
            </div>
            <div className="w-full h-48 mx-auto">
                <Line
                    data={state}
                    options={{
                        title:{
                        display:false,
                        },
                        legend:{
                        display:false,
                        },
                        scales: {
                            xAxes: [{
                               gridLines: {
                                  display: false,
                               },
                            }],
                            yAxes: [{
                               gridLines: {
                                  display: false,
                                  drawBorder: false,
                               },
                               ticks: {
                                   display: false,
                               }
                            }]
                       },
                       responsive: true,
                       maintainAspectRatio: false
                    }}
                />
            </div>
        </div>
    );
}

export default ThermPanelChild;