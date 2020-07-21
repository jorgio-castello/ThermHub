import React from 'react';
import Header from './Header';
import HeaderState from '../interfaces/Header';

interface AppProps {}
interface AppState {
  headerData: HeaderState;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props:AppProps) {
    super (props);
    
    this.state = {
      headerData: {city: '', state: '', time: new Date(), temperature: 0},
    }
  }

  componentDidMount(): void {
    // We can include a fetch request here: to grab data - for now, utilizing default values
    this.setState({
      headerData: { city: 'Madison', state: 'Wisconsin', time: new Date(), temperature: 72 },
    });
  }

  render() {
    return (
      <div className="container-fluid flex flex-col py-2 mx-auto h-screen bg-blue-100 justify-around">
        <Header headerData={this.state.headerData}  />
        <div className="flex flex-row w-2/3 mx-auto justify-between">
          <div className="w-64 h-64 bg-white mx-auto shadow-lg rounded-lg"></div>
          <div className="w-64 h-64 bg-white mx-auto shadow-lg rounded-lg"></div>
          <div className="w-64 h-64 bg-white mx-auto shadow-lg rounded-lg"></div>
          <div className="w-64 h-64 bg-white mx-auto shadow-lg rounded-lg"></div>
        </div>
        <div className="flex flex-row w-2/3 mx-auto py-5 bg-white rounded-lg shadow-lg items-center justify-around">
          <div className="w-40 h-40 shadow-md rounded-lg"></div>
          <div className="w-40 h-40 shadow-md rounded-lg"></div>
          <div className="w-40 h-40 shadow-md rounded-lg"></div>
          <div className="w-40 h-40 shadow-md rounded-lg"></div>
          <div className="w-40 h-40 shadow-md rounded-lg"></div>
        </div>
      </div>
      );
  }
}

export default App;
