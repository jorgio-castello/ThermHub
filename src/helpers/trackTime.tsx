import App from "../components/App";

function calculateTime(this: App): void {
    const wisconsinDateStr:string = new Date().toLocaleString("en-US", {timeZone: "America/Menominee"});
    const wisconsinTime:Date = new Date(wisconsinDateStr);
    
    let hours:string|number = wisconsinTime.getHours();
    let minutes:string|number = wisconsinTime.getMinutes();

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    this.setState({
      header: {
        ...this.state.header,
        time: `${hours}:${minutes}`,
      }
    });
};

export default function trackTime(this: App): void {
  calculateTime.call(this);
  setTimeout(() => {
    calculateTime.call(this);
    setInterval(calculateTime.bind(this), 60000);
  }, 60000 - this.state.header.date.getSeconds() * 1000);
}