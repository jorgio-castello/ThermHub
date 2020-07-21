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
      <div className="container-fluid pt-5 mx-auto h-screen bg-blue-100">
        <Header headerData={this.state.headerData}  />
      </div>
      );
  }
}

export default App;
