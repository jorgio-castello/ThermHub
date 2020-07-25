import React from 'react';
import ThermPanelChild from './ThermPanelChild';

function ThermPanel() {
    return (
        <div className="flex flex-row w-10/12 mx-auto py-5 px-1 rounded-lg shadow-lg justify-around">
            <ThermPanelChild />
            <ThermPanelChild />
            <ThermPanelChild />
            <ThermPanelChild />
        </div>
    );
}

export default ThermPanel;