import React from 'react';
import CONFIG from '../config';
import {ControlPanel, Header, RaspberrySettings, ThermModal, ThermPanel, WeatherForecast} from './';
import {AppState, init, DegreesFormat, generateHeader, NowResponse, Therm, TimeFormat} from '../interfaces';
import {getDate, getNow} from '../helpers'
import {closeModal, expandThermPanel, setTemperatureFormat, setTimeFormat, toggleRaspberrySettings} from '../eventHandlers';
import {AppContainer} from '../assets/cssClasses';

class App extends React.Component<{}, AppState> {
  private timeThread = 0;

  constructor(props:{}) {
    super (props);
    this.state = init();

    this.closeModal = closeModal.bind(this);
    this.expandThermPanel = expandThermPanel.bind(this);
    this.setTemperatureFormat = setTemperatureFormat.bind(this);
    this.setTimeFormat = setTimeFormat.bind(this);
    this.toggleRaspberrySettings = toggleRaspberrySettings.bind(this);
  }

  componentDidMount(): void {
    const startTime = getNow();
    this.updateData(startTime)
      .then(() => {
        this.startTimeThread();
      });
  }

  componentWillUnmount(): void {
    if (this.timeThread) {
      clearInterval(this.timeThread);
      this.timeThread = 0;
    }
  }

  closeModal(): void {};
  expandThermPanel(e: Event): void {};
  toggleRaspberrySettings(): void {};
  setTimeFormat(use24Hour: TimeFormat): void {};
  setTemperatureFormat(degreesFormat: DegreesFormat): void {};

  private startTimeThread(): void {
    this.timeThread = window.setInterval(() => {
      const date = getDate();
      if (date !== undefined) {
        this.setState({date});
        this.updateData(date);
      }
    }, 2000);
  }

  private async updateData(now: Date): Promise<void> {
    await this.fetchNow()
      .then(data => {
        console.log(data);
        const {forecast, thermostats} = data;
        const currentWeatherData = thermostats.find(therm => therm.name === 'weather.gov');
        
        this.setState({
          header: generateHeader(CONFIG.city, CONFIG.state, currentWeatherData?.temperature),
          thermostats,
          forecast,
          date: now,
        });
      });
    await this.fetchPast(new Date(now.getTime() - 43200000), now)
      .then(past => {
        console.log(past);
        this.setState({past});
      });
  }

  private fetchNow = (): Promise<NowResponse> => 
    fetch(`${CONFIG.host}/now`).then(res => res.json());
  
  private fetchPast = (after: Date, before: Date): Promise<Therm[]> =>
    fetch(`${CONFIG.host}/past?start_date=${after.toISOString()}&end_date=${before.toISOString()}`).then(res => res.json());
  
  render() {
    const {header, date, use24Hour, degreesFormat, showThermModal, showRaspberrySettings} = this.state;
    return (
      <>
        <div className={AppContainer}>
          <ControlPanel use24Hour={use24Hour} degreesFormat={degreesFormat} setTemperatureFormat={this.setTemperatureFormat} setTimeFormat={this.setTimeFormat} />
          <div className="inline-flex flex-col justify-center lg:w-3/4 w-11/12">
              <Header headerData={header} date={date} use24Hour={use24Hour} degreesFormat={degreesFormat} toggleRaspberrySettings={this.toggleRaspberrySettings} />
              { showRaspberrySettings ? (
                <RaspberrySettings degreesFormat={degreesFormat} use24Hour={use24Hour} setTemperatureFormat={this.setTemperatureFormat} setTimeFormat={this.setTimeFormat} />
              ): null}
              <ThermPanel thermostatData={this.state.thermostats} expandThermPanel={this.expandThermPanel} degreesFormat={degreesFormat} use24Hour={use24Hour} pastData={this.state.past} showThermModal={showThermModal} />
              <WeatherForecast forecastData={this.state.forecast} degreesFormat={degreesFormat} />
          </div>
        </div>
        {showThermModal ? (
          <ThermModal therm={this.state.thermostats[this.state.thermModalIdx]} updateModalDisplay={this.closeModal} degreesFormat={degreesFormat} use24Hour={use24Hour} showThermModal={showThermModal} />
        ) : null}
      </>
      );
  }
}

export default App;
