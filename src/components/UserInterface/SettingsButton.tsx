import React from 'react';
import classnames from 'classnames';

interface settingsButtonProps {
  active: boolean,
  onClick: () => void,
  size: string,
  children: any,
}

function SettingsButton({ active, size, onClick, children }: settingsButtonProps) {
  let inactiveClass = 'border border-solid border-teal-300 text-teal-400 bg-white rounded-full shadow-lg font-thin'
  let activeClass = 'bg-teal-400 text-white rounded-full shadow-lg font-thin border border-solid border-teal-300';

  inactiveClass += size;
  activeClass += size;

  const classBasedOnActive = active ? activeClass : inactiveClass;
  return (
    <button className={classnames(classBasedOnActive)} onClick={onClick}>
      {children}
    </button>
  );
}

export default SettingsButton;