const possibleTemperatures = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];
const possibleRH = [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75];

class ThermClass {
  constructor(name, time) {
    this.id = 0;
    this.time = time;
    this.name = name;
    this.is_hygrostat;
    this.relative_humidity;
    this.temperature;

    this.init();
  }

  init() {
    this.is_hygrostat();
    this.setTemperature();
    this.setHumidity();
  }

  is_hygrostat() {
    this.is_hygrostat = this.name === 'Thermostat';
  }

  setTemperature() {
    this.temperature = possibleTemperatures[Math.floor(Math.random() * possibleTemperatures.length)];
  }

  setHumidity() {
    if (this.is_hygrostat) {
      this.relative_humidity = possibleRH[Math.floor(Math.random() * possibleRH.length)];
    } else {
      this.relative_humidity = 0;
    }
  }
}

module.exports = ThermClass;