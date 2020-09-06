import React from 'react';
import Calendar from '../interfaces/Calendar';
import { HeaderProps } from '../interfaces/HeaderProps';
import scrubTemperature from '../helpers/temperatureScrubber';
import { formatDateStr, formatTime } from '../helpers/formatTime'
import { ReactComponent as MenuSvg } from '../assets/svgs/menu.svg';

function Header({ headerData, date, settings, toggleRaspberrySettings }: HeaderProps) {
	const { degreesFormat, use24Hour } = settings;
	const dayOfWeek = Calendar.daysOfWeek[date.getDay() - 1];
	const dateStr = formatDateStr(date);
	const temperature = scrubTemperature(headerData.temperature, degreesFormat);
	const time = formatTime(use24Hour, date);

	/*
		'': default, mobile styling
		sm: RaspberryPI UI styling
		lg: desktop styling

		Note: sm declarations overwrite mobile styles, lg overwrites sm and and mobile styles
	*/
	return (
		<div className="flex flex-col shadow-xl rounded-lg sm:flex-row bg-white px-3 py-2 sm:px-6 sm:py-1 lg:py-2 lg:px-12">
			<div className="flex flex-row justify-between items-center lg:w-7/12 lg:mx-auto ">
				<div className="flex items-center">
					<div className="flex font-light text-left text-blue-300 text-lg sm:text-2xl lg:text-3xl">
						<div className="flex-row">
							<span className="mr-1">
								{`${headerData.city},`}
							</span>
							<span className="mr-2 sm:mr-5">
								{headerData.state}
							</span>
						</div>
					</div>
					<div className="mr-2 sm:mr-5">
						<div className="flex font-thin text-3xl text-teal-300 items-start sm:text-5xl lg:text-6xl">{`${temperature}\u00b0${degreesFormat[0]}`}</div>
					</div>
				</div>
				<button className="inline-flex lg:hidden" onClick={() => toggleRaspberrySettings()}>
					<MenuSvg className="w-6 h-6 sm:w-8 sm:h-8" />
				</button>
			</div>
			<div className="justify-end items-center flex flex-row-reverse sm:w-5/12 sm:flex-col sm:items-end">
				<div className="font-thin text-2xl mb-0 text-teal-300 text-left sm:text-right sm:mr-0 sm:text-4xl lg:text-5xl lg:mb-2">{time}</div>
				<div className="font-thin text-lg text-gray-500 lg:text-2xl">{dayOfWeek}</div>
				<div className="font-thin text-lg text-gray-500 mr-2 sm:m-0 lg:text-2xl">{dateStr}</div>
			</div>
		</div>
	);
}

export default Header;