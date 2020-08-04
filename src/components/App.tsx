import React from 'react';
import CONFIG from '../config';
import {AppState, init} from '../interfaces/App';
import {generateHeader} from '../interfaces/Header';
import trackTime from '../helpers/trackTime'
import Therm from '../interfaces/Therm';
import Header from './Header';
import ThermPanel from './ThermPanel';
import WeatherForecast from './WeatherForecast';

class App extends React.Component<{}, AppState> {
  constructor(props:{}) {
    super (props);
    this.state = init();
  }

  componentDidMount(): void {
    fetch(`${CONFIG.host}:${CONFIG.port}/now`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const { forecast, thermostats } = data;
        const [currentWeatherData] = thermostats.filter((therm:Therm) => therm.name === 'weather.gov');
        
        this.setState({
          header: generateHeader(CONFIG.city, CONFIG.state, currentWeatherData?.temperature),
          thermostats,
          forecast,
        }, () => trackTime.call(this));  
      });
  }

  render() {
    return (
      <div className="flex flex-col py-2 h-screen bg-blue-100 justify-around">
          <Header headerData={this.state.header}  />
          <ThermPanel thermostatData={this.state.thermostats}/>
          <WeatherForecast forecastData={this.state.forecast} />
      </div>
      );
  }
}

export default App;
