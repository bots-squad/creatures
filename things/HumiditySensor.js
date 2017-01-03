const Thing = require('../mum/Thing').Thing;
const HumidityComponent = require('../components/HumidityComponent').HumidityComponent;

class HumiditySensor extends Thing {
  constructor({id, minHumidity, maxHumidity, delay}) {
    super({id, delay});
    this.humidity = new HumidityComponent({minHumidity, maxHumidity})
  }
  generateData() {
    let now = new Date();
    let t = now.getMinutes() + now.getSeconds() / 100;
    this.humidity.value = this.humidity.getLevel(t);
    //this.when = t;
  }
  getData() {
    return {
      id: this.id,
      value: this.humidity.value,
      unit: this.humidity.unit,
      delay: this.delay
    }
  }
}

module.exports = {
  HumiditySensor: HumiditySensor
};
