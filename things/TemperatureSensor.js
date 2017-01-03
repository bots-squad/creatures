const Thing = require('../mum/Thing').Thing;
const TemperatureComponent = require('../components/TemperatureComponent').TemperatureComponent;


class TemperatureSensor extends Thing {
  constructor({id, minTemperature, maxTemperature, delay}) {
    super({id, delay});
    this.temperature = new TemperatureComponent({minTemperature, maxTemperature})
  }
  generateData() {
    let now = new Date();
    let t = now.getMinutes() + now.getSeconds() / 100;
    this.temperature.value = this.temperature.getLevel(t);
    //this.when = t;
  }
  getData() {
    return {
      id: this.id,
      value: this.temperature.value,
      unit: this.temperature.unit,
      delay: this.delay
    }
  }
}

module.exports = {
  TemperatureSensor: TemperatureSensor
};
