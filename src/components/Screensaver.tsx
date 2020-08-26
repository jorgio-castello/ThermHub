import React from 'react';
import { Screen } from '../interfaces/App';

interface ScreenSaverProps {
  date: Date,
  screen: Screen,
  screenSaverSrc: string[],
  tap: () => void,
}

function ScreenSaver({ date, screen, screenSaverSrc, tap }: ScreenSaverProps) {
  if (screen !== Screen.ScreenSaver) {
    return null;
  }

  const background = Math.floor(date.getTime() / 60) % screenSaverSrc.length;
  console.log(`choosing background #${background}`);

  const backgroundCss = {
    height: window.innerHeight,
    width: window.innerWidth,
    backgroundImage: `url('${screenSaverSrc[background]}')`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
  } as React.CSSProperties;

  const timeCss = {
    position: 'fixed',
    right: '15px',
    bottom: '15px',
    fontSize: '72pt',
    color: 'white',
  } as React.CSSProperties;

  return (
    // TODO: Show the DoW, Date, and main Thermostat reading here
    <div onClick={tap} style={backgroundCss}>
      <p style={timeCss}>{date.toLocaleTimeString()}</p>
    </div>
  )
}

export default ScreenSaver;