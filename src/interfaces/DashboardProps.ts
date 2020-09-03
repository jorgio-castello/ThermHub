import { Forecast as ForecastState } from '../interfaces/Forecast'
import { Header as HeaderState } from '../interfaces/Header';
import { Therm as ThermostatState } from '../interfaces/Therm';
import { Screen } from './App';
import Settings from './Settings';

export type DashboardProps = {
  header: HeaderState,
  date: Date,
  past: ThermostatState[],
  forecast_daily: ForecastState[],
  showThermModal: boolean,
  showRaspberrySettings: boolean,
  expandThermPanel: Function,
  settings: Settings,
  setSettings: Function,
  screen: Screen,
  thermModalIdx: number,
  thermostats: ThermostatState[],
  toggleRaspberrySettings: Function,
  updateModalDisplay: Function,
}