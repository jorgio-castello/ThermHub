import React from 'react';
import Calendar from '../interfaces/Calendar';
import { HeaderProps } from '../interfaces/HeaderProps';
import scrubTemperature from '../helpers/temperatureScrubber';
import { formatDateStr, formatTime } from '../helpers/formatTime'
import { ReactComponent as MenuSvg } from '../assets/svgs/menu.svg';

function Header({ headerData, date, use24Hour, degreesFormat, toggleRaspberrySettings }: HeaderProps) {
	const dayOfWeek = Calendar.daysOfWeek[date.getDay() - 1];
	const dateStr = formatDateStr(date);
	const temperature = scrubTemperature(headerData.temperature, degreesFormat);
	const time = formatTime(use24Hour, date);
	return (
		<div className="flex flex-row bg-white py-2 px-12 sm:px-6 sm:py-1 shadow-xl rounded-lg">
			<div className="flex flex-row w-7/12 mx-auto justify-start items-center">
				<div className="flex flex-col font-light lg:text-3xl text-2xl text-left text-blue-300">
					<div className="flex-row">
						<span className="mr-1">
							{`${headerData.city},`}
						</span>
						<span className="mr-5">
							{headerData.state}
						</span>
					</div>
				</div>
				<div className="mr-5">
					<div className="flex font-thin lg:text-6xl text-5xl text-teal-300 items-start">{`${temperature}\u00b0${degreesFormat[0]}`}</div>
				</div>
				<button className="inline-flex lg:hidden" onClick={() => toggleRaspberrySettings()}>
					<MenuSvg className="w-8 h-8" />
				</button>
			</div>

			<div className="w-5/12 flex flex-col text-right">
				<div className="font-thin lg:text-5xl text-4xl mb-2 sm:mb-0 text-teal-300">{time}</div>
				<div className="font-thin lg:text-2xl text-xl text-gray-500">{dayOfWeek}</div>
				<div className="font-thin lg:text-2xl text-xl text-gray-500">{dateStr}</div>
			</div>
		</div>
	);
}

export default Header;