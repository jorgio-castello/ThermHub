import React from 'react';
import { ThermChildProps } from '../../interfaces/ThermChildProps';
import { Line } from 'react-chartjs-2';
import ThermPanelChildHeader from './ThermPanelChildHeader';
import { generateAxes } from '../../helpers/generateGraphData';

function ThermPanelChild(props: ThermChildProps) {
	let dateAxis, temperatureAxis, humidityAxis;
	if (props.past.length > 0) {
		const thermInterval = props.past.slice(props.past.length - props.thermInterval);
		let axes = generateAxes(thermInterval, 5, props.degreesFormat, props.use24Hour);
		if (axes) {
			[dateAxis, temperatureAxis, humidityAxis] = axes;
		}
	}
	const graph = {
		labels: dateAxis,
		datasets: [
			{
				data: temperatureAxis,
				label: 'ThermData',
				fill: false,
				lineTension: 0.5,
				backgroundColor: 'rgba(75,192,192,1)',
				borderColor: '#79E3CF',
				borderCapStyle: 'butt',
				borderJointStyle: 'round',
				borderWidth: 2,
				pointBorderWidth: 0,
				pointRadius: 0,
				yAxisID: 'temperatureData',
			}
		]
	}

	const yAxes = [{
		id: 'temperatureData',
		position: 'left',
		gridLines: {
			display: true,
			color: '#CDFCE5',
		},
		ticks: {
			display: true,
			fontFamily: 'system-ui',
			fontSize: 10,
			maxTicksLimit: humidityAxis && humidityAxis.length > 0 ? 3 : 5,
			callback: (value: number): string => `${value}\u00b0`,
		}
	}];

	if (humidityAxis && humidityAxis.length > 0) {
		graph.datasets.push({
			data: humidityAxis,
			label: '%RH',
			fill: false,
			lineTension: 0.5,
			backgroundColor: 'rgba(75,192,192,1)',
			borderColor: 'lightgray',
			borderCapStyle: 'butt',
			borderJointStyle: 'round',
			borderWidth: 2,
			pointBorderWidth: 0,
			pointRadius: 0,
			yAxisID: 'humidityData',
		});
		yAxes.push({
			id: 'humidityData',
			position: 'right',
			gridLines: {
				display: true,
				color: '#CDFCE5',
			},
			ticks: {
				display: true,
				fontFamily: 'system-ui',
				fontSize: 10,
				maxTicksLimit: 3,
				callback: (value: number): string => Math.floor(value * 100) + '%',
			},
		})
	}

	return (
		<button id={props.id} type="button" className={`bg-white bg-opacity-100 shadow-lg rounded-lg flex flex-col justify-around w-${props.isModal ? props.width : '56'} lg:w-${props.width} lg:mr-5 py-3`} onClick={(e) => props.updateModalDisplay(e)}>
			<ThermPanelChildHeader thermostat={props.thermostat} degreesFormat={props.degreesFormat} />
			<div className={`lg:w-full w-11/12 h-${props.isModal ? 64 : 32} lg:h-${props.isModal ? 'auto' : '64'} mx-auto lg:px-4`}>
				<Line
					data={graph}
					options={{
						title: { display: false },
						legend: { display: false },
						scales: {
							xAxes: [{
								gridLines: {
									display: false,
									color: '#CDFCE5',
								},
								ticks: {
									display: true,
									autoSkip: true,
									fontFamily: 'system-ui',
									fontSize: 9,
									minRotation: 0,
									maxRotation: 0,
									maxTicksLimit: 4,
								}
							}],
							yAxes
						},
						responsive: true,
						maintainAspectRatio: props.isModal && window.innerWidth > 800 ? true : false,
					}}
				/>
			</div>
		</button >
	);
}

export default ThermPanelChild;