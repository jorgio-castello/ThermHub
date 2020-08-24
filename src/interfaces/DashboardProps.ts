import { Forecast as ForecastState, Header as HeaderState, Therm as ThermostatState } from '../interfaces';

export type DashboardProps = {
  header: HeaderState,
  date: Date,
  use24Hour: boolean,
  degreesFormat: string,
  past: ThermostatState[],
  forecast_daily: ForecastState[],
  showThermModal: boolean,
  showRaspberrySettings: boolean,
  expandThermPanel: Function,
  setTemperatureFormat: Function,
  setThermInterval: Function,
  setTimeFormat: Function,
  thermModalIdx: number,
  thermInterval: number,
  thermostats: ThermostatState[],
  toggleRaspberrySettings: Function,
  updateModalDisplay: Function,
}