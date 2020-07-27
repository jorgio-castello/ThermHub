import React from 'react';
import Header from './Header';
import HeaderState from '../interfaces/Header';
import ThermPanel from './ThermPanel';
import WeatherForecast from './WeatherForecast';

interface AppProps {}
interface AppState {
  headerData: HeaderState;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props:AppProps) {
    super (props);
    
    this.state = {
      headerData: {city: '', state: '', date: new Date(), temperature: 0, time: ''},
    }
  }

  componentDidMount(): void {
    fetch('http://localhost:3000/now')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const [currentWeatherData] = data.thermostats.filter((therm:any) => therm.name === 'weather.gov');
        
        this.setState({
          headerData: { city: 'Madison', state: 'Wisconsin', date: new Date(), temperature: currentWeatherData?.temperature ?? 0, time: this.state.headerData.time },
        }, () => {
          this.calculateTime();

          setTimeout(() => {
            this.calculateTime.call(this);
            setInterval(this.calculateTime.bind(this), 60000);
          }, 60000 - this.state.headerData.date.getSeconds() * 1000);
        });
      });
  }

  calculateTime(): void {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const amPM = hours >= 12;

    const cleanUpHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours < 10 ? '0' + hours : hours;
    const cleanUpMinutes = minutes < 10 ? '0' + minutes : minutes;

    this.setState({
      headerData: {
        ...this.state.headerData,
        time: `${cleanUpHours}:${cleanUpMinutes} ${amPM ? 'PM' : 'AM'}`,
      }
    });
  }

  render() {
    return (
      <div className="flex flex-col py-2 h-screen bg-blue-100 justify-around">
          <Header headerData={this.state.headerData}  />
          <ThermPanel />
          <WeatherForecast />
      </div>
      );
  }
}

export default App;
