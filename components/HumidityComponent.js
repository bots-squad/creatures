/*
  y = Amplitude() * cos B(x - unitsTranslatedToTheRight) + unitsTranslatedUp()
  ref:https://www.niwa.co.nz/education-and-training/schools/resources/climate/modelling
*/

class HumidityComponent {
  constructor({minHumidity=1.0, maxHumidity=100.0, id=null}) {
    let getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    this.min = minHumidity;
    this.max = maxHumidity;
    this.unit = "%";
    this.value = null;
    this.B = Math.PI / 2;
    this.unitsTranslatedToTheRight = getRandomInt(0, 5);

  }
  amplitude() {
    return (this.max-this.min)/2;
  }
  unitsTranslatedUp() {
    return this.min + this.amplitude();
  }
  getLevel(t) {
    return this.amplitude() * Math.cos(this.B *(t-this.unitsTranslatedToTheRight)) + this.unitsTranslatedUp();
  }
}

module.exports = {
  HumidityComponent: HumidityComponent
};
