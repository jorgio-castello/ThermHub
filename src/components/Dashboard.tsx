import React from 'react';
import { AppContainer } from '../assets/cssClasses';
import { ControlPanel, Header, RaspberrySettings, ThermModal, ThermPanel, WeatherForecast } from './';
import { DashboardProps } from '../interfaces';
import { Screen } from '../interfaces/App';

function Dashboard(props: DashboardProps) {
  if (props.screen !== Screen.Dashboard) {
    return null;
  }
  const { header, date, forecast_daily, use24Hour, degreesFormat, past, showThermModal, showRaspberrySettings, thermInterval, thermModalIdx, thermostats } = props;
  return (
    <>
      <div className={AppContainer}>
        <ControlPanel use24Hour={use24Hour} degreesFormat={degreesFormat} setTemperatureFormat={props.setTemperatureFormat} setTimeFormat={props.setTimeFormat} />
        <div className="inline-flex flex-col justify-center lg:w-3/4 w-11/12">
          <Header headerData={header} date={date} use24Hour={use24Hour} degreesFormat={degreesFormat} toggleRaspberrySettings={props.toggleRaspberrySettings} />
          {showRaspberrySettings ? (
            <RaspberrySettings degreesFormat={degreesFormat} use24Hour={use24Hour} setTemperatureFormat={props.setTemperatureFormat} setTimeFormat={props.setTimeFormat} setThermInterval={props.setThermInterval} thermInterval={thermInterval} />
          ) : null}
          <ThermPanel thermostatData={thermostats} expandThermPanel={props.expandThermPanel} degreesFormat={degreesFormat} use24Hour={use24Hour} pastData={past} showThermModal={showThermModal} thermInterval={thermInterval} />
          <WeatherForecast forecastData={forecast_daily} degreesFormat={degreesFormat} />
        </div>
      </div>
      {showThermModal ? (
        <ThermModal therm={thermostats[thermModalIdx]} updateModalDisplay={props.updateModalDisplay} degreesFormat={degreesFormat} use24Hour={use24Hour} showThermModal={showThermModal} past={past} setThermInterval={props.setThermInterval} thermInterval={thermInterval} />
      ) : null}
    </>
  );
}

export default Dashboard;