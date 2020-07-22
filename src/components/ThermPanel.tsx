import React from 'react';

function ThermPanel() {
    return (
        <div className="flex flex-row w-2/3 mx-auto py-5 rounded-lg shadow-lg justify-around border-solid bg-gray-400 bg-opacity-25">
            <div className="w-56 h-56 bg-white mx-auto shadow-lg rounded-lg"></div>
            <div className="w-56 h-56 bg-white mx-auto shadow-lg rounded-lg"></div>
            <div className="w-56 h-56 bg-white mx-auto shadow-lg rounded-lg"></div>
            <div className="w-56 h-56 bg-white mx-auto shadow-lg rounded-lg"></div>
        </div>
    );
}

export default ThermPanel;