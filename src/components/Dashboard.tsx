import React from 'react';
import { AppContainer } from '../assets/cssClasses';
import ControlPanel from './Settings/ControlPanel';
import Header from './Header';
import RaspberrySettings from './Settings/RaspberrySettings';
import ThermModal from './WeatherGraph/ThermModal';
import ThermPanel from './WeatherGraph/ThermPanel';
import WeatherForecast from './WeatherForecast/WeatherForecast'
import { DashboardProps } from '../interfaces/DashboardProps';
import { Screen } from '../interfaces/App';

function Dashboard(props: DashboardProps) {
  if (props.screen !== Screen.Dashboard) {
    return null;
  }
  const { header, date, forecast_daily, past, settings, showThermModal, showRaspberrySettings, thermModalIdx, thermostats } = props;
  return (
    <>
      <div className={AppContainer}>
        <ControlPanel settings={settings} setSettings={props.setSettings} />
        <div className="inline-flex flex-col justify-center lg:w-3/4 w-11/12">
          <Header headerData={header} date={date} settings={settings} toggleRaspberrySettings={props.toggleRaspberrySettings} />
          {showRaspberrySettings ? (
            <RaspberrySettings settings={settings} setSettings={props.setSettings} />
          ) : null}
          <ThermPanel thermostatData={thermostats} expandThermPanel={props.expandThermPanel} settings={settings} pastData={past} showThermModal={showThermModal} />
          <WeatherForecast forecastData={forecast_daily} settings={settings} />
        </div>
      </div>
      {showThermModal ? (
        <ThermModal therm={thermostats[thermModalIdx]} updateModalDisplay={props.updateModalDisplay} settings={settings} setSettings={props.setSettings} showThermModal={showThermModal} past={past} />
      ) : null}
    </>
  );
}

export default Dashboard;