import React from 'react';
import CONFIG from '../config';
import {AppState, init} from '../interfaces/App';
import {generateHeader} from '../interfaces/Header';
import {getDate} from '../helpers/trackTime'
import Therm from '../interfaces/Therm';
import Header from './Header';
import ThermPanel from './ThermPanel';
import WeatherForecast from './WeatherForecast';
import ThermModal from './ThermModal';
import { activeBtnState, inactiveBtnState } from '../assets/cssClasses';

class App extends React.Component<{}, AppState> {
  private timeThread = 0;
  
  constructor(props:{}) {
    super (props);
    this.state = init();

    this.expandThermPanel = this.expandThermPanel.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount(): void {
    this.startTimeThread();
    fetch(`${CONFIG.host}/now`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const {forecast, thermostats} = data;
        const [currentWeatherData] = thermostats.filter((therm:Therm) => therm.name === 'weather.gov');
        
        this.setState({
          header: generateHeader(CONFIG.city, CONFIG.state, currentWeatherData?.temperature),
          thermostats,
          forecast,
        });  
      });
  }

  componentWillUnmount(): void {
    if (this.timeThread) {
      clearInterval(this.timeThread);
      this.timeThread = 0;
    }
  }

  private startTimeThread(): void {
    this.timeThread = window.setInterval(() => {
      const date = getDate();
      if (date !== undefined) {
        this.setState({date});
      }
    });
  }

  expandThermPanel(e:Event): void {
    const target = e.currentTarget as HTMLInputElement;
    const index = Number(target.getAttribute('id'));

    this.setState({ showThermModal: true, thermModalIdx: index })
  }

  closeModal(): void {
    this.setState({ showThermModal: false, thermModalIdx: -1 });
  }

  render() {
    const {header, date, use24Hour, degreesFormat} = this.state;
    return (
      <>
        <div className="flex p-10 pt-5 bg-indigo-200 bg-opacity-75 h-screen justify-around">
            <div className="inline-flex w-2/12 flex-col justify-center">
              <div className="text-left text-5xl font-bold text-blue-600 tracking-tight">{`Therm\u00b0`}</div>
              <div className="py-5 bg-blue-100 bg-opacity-75 shadow-lg rounded-lg border border-solid border-indigo-200"> 
                <div className="ml-2 mb-2 font-light text-blue-500">Select a Location:</div>
                <input className="h-10 rounded-lg border border-solid border-gray-300 w-3/4 ml-2 pl-2 font-thin shadow-lg" type="text" placeholder="Enter a city"/>
                <div className="ml-2 mt-5 mb-2 font-light text-blue-500">Temperature format:</div>
                <div className="flex flex-row ml-2 flex-wrap">
                  <button className={degreesFormat === 'Fahrenheit' ? activeBtnState : inactiveBtnState} onClick={() => this.setState({degreesFormat: 'Fahrenheit'})}>Fahrenheit</button>
                  <button className={degreesFormat === 'Celsius' ? activeBtnState : inactiveBtnState} onClick={() => this.setState({degreesFormat: 'Celsius'})}>Celsius</button>
                  <button className={degreesFormat === 'Kelvin' ? activeBtnState : inactiveBtnState} onClick={() => this.setState({degreesFormat: 'Kelvin'})}>Kelvin</button>
                </div>
                <div className="ml-2 mt-5 mb-2 font-light text-blue-500">Time format:</div>
                <div className="flex flex-row ml-2">
                  <button className={use24Hour ? inactiveBtnState : activeBtnState} onClick = {() => this.setState({use24Hour:false})}>12H</button>
                  <button className={use24Hour ? activeBtnState : inactiveBtnState} onClick = {() => this.setState({use24Hour:true})}>24H</button>
                </div>
              </div>
            </div>
            <div className="inline-flex flex-col justify-center w-3/4">
                <div className="inline-flex flex-col">
                      <Header headerData={header} date={date} use24Hour={use24Hour} degreesFormat={degreesFormat}/>
                      <ThermPanel thermostatData={this.state.thermostats} expandThermPanel={this.expandThermPanel} degreesFormat={degreesFormat} use24Hour={use24Hour} />
                      <WeatherForecast forecastData={this.state.forecast} degreesFormat={degreesFormat} />
                </div>
            </div>
        </div>
        {this.state.showThermModal ? <ThermModal therma={this.state.thermostats[this.state.thermModalIdx]} updateModalDisplay={this.closeModal} degreesFormat={degreesFormat} use24Hour={use24Hour} /> : <div />}
      </>
      );
  }
}

export default App;
