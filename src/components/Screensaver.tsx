import React from 'react';

interface ScreenSaverProps {
  screenSaverSrc: string[],

}

function ScreenSaver({ screenSaverSrc }: ScreenSaverProps) {
  return (
    // <div></div>
    <img src={screenSaverSrc[0]} />
  )
}

export default ScreenSaver;