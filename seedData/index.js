const fs = require('fs');
const os = require('os');
const path = require('path');
const ThermClass = require('./ThermClass.js');

const therms = ['weather.gov', 'Thermostat', 'outside'];
const fiveMinutesInMS = 300000;

const sampleData = [];
const generateSampleData = (startTime, endTime) => {
  if (startTime.getTime() > endTime.getTime()) return;
  therms.forEach(therm => {
    const Therm = new ThermClass(therm, startTime);
    sampleData.push(Therm);
  });
  generateSampleData(new Date(startTime.getTime() + fiveMinutesInMS), endTime);
}

let currentTime = new Date();
while (currentTime.getMinutes() % 5 !== 0) { // Obtain minutes as a multiple of 5
  currentTime = new Date(currentTime - fiveMinutesInMS / 5);
}
const currentTimeLess24Hours = new Date(currentTime - fiveMinutesInMS * 12 * 24);

generateSampleData(currentTimeLess24Hours, currentTime);

const jsModule = `const data = ${JSON.stringify(sampleData)};${os.EOL}export default data;`
fs.writeFile(path.join(__dirname, '../src/ThermHub_PastData.js'), jsModule, err => {
  if (err) {
    throw new Error(err);
  }
  console.log('Seed Data generation has complete');
});