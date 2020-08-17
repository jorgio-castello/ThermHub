import React from 'react';
import { Calendar, HeaderProps } from '../interfaces';
import { formatDateStr, formatTime, scrubTemperature } from '../helpers';
import { ReactComponent as MenuSvg } from '../assets/svgs/menu.svg';

function Header({ headerData, date, use24Hour, degreesFormat, toggleRaspberrySettings }: HeaderProps) {
    const dayOfWeek = Calendar.daysOfWeek[date.getDay() - 1];
    const dateStr = formatDateStr(date);
    const temperature = scrubTemperature(headerData.temperature, degreesFormat);
    const time = formatTime(use24Hour, date);
    return (
        <div className="flex flex-row bg-white py-2 px-12 sm:px-6 sm:py-1 shadow-xl rounded-lg">
            <div className="flex flex-row w-7/12 mx-auto justify-start items-center">
                <div className="flex-col">
                    <div className="font-light lg:text-3xl text-2xl text-left text-blue-300">
                        <span className="mr-1">
                            {`${headerData.city},`}
                        </span>
                        <span className="mr-5">
                            {headerData.state}
                        </span>
                    </div>
                    <button className="lg:hidden" onClick={() => toggleRaspberrySettings()}>
                        <MenuSvg className="w-6 h-6" />
                    </button>
                </div>
                <div className="mr-5">
                    <div className="font-thin lg:text-6xl text-5xl text-teal-300">{`${temperature}\u00b0${degreesFormat[0]}`}</div>
                </div>
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