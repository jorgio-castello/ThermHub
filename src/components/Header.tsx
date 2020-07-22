import React from 'react';
import HeaderProps from '../interfaces/Header';

interface props {
    headerData: HeaderProps,
}

function Header({ headerData }: props) {
    return (
        <div className="w-10/12 flex flex-row mx-auto bg-white py-2 px-12 shadow-xl rounded-lg">
            <div className="flex flex-row w-7/12 mx-auto justify-start items-center">
                <div>
                    <div className="font-light text-3xl text-left text-blue-300">
                        <span className="mr-1">
                            {`${headerData.city},`}  
                        </span>
                        <span className="mr-5">
                            {headerData.state}
                        </span>
                    </div>
                </div>
                <div className="mr-5">
                    <div className="font-thin text-6xl text-teal-300">{`${headerData.temperature}\u00b0`}</div>
                </div>
            </div>

            <div className="w-5/12 flex flex-col text-right">
                <div className="font-thin text-5xl mb-2 text-teal-300">12:32 PM</div>
                <div className="font-thin text-2xl text-gray-500">Sunday</div>
                <div className="font-thin text-2xl text-gray-500">August 23, 2020</div>
            </div>
        </div>
    );
}

export default Header;