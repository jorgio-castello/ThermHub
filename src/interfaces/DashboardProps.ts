import { Forecast as ForecastState } from '../interfaces/Forecast'
import { Header as HeaderState } from '../interfaces/Header';
import { Therm as ThermostatState } from '../interfaces/Therm';
import { Screen } from './App';

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
  screen: Screen,
  thermModalIdx: number,
  thermInterval: number,
  thermostats: ThermostatState[],
  toggleRaspberrySettings: Function,
  updateModalDisplay: Function,
}