# creatures

This is a "Things" simulator (think IOT)

## See it in action

Proudly hosted on https://www.clever-cloud.com/

- all sensors: http://creatures.cleverapps.io/sensors
- all temperature sensors: http://creatures.cleverapps.io/sensors/temperature
- all humidity sensors: http://creatures.cleverapps.io/sensors/humidity
- one temperature sensor: http://creatures.cleverapps.io/sensors/temperature/t42
- one humidity sensor: http://creatures.cleverapps.io/sensors/humidity/h42

## Create a new sensor

- a sensor (always extend `Thing`) is a set of one or more components:
  - sensors implementations are in `/things`
  - components implementations are in `/components`
  - sensor sample: https://github.com/bots-squad/creatures/blob/master/things/TemperatureSensor.js

Here `TemperatureSensor` has only one component: `TemperatureComponent`

```javascript
class TemperatureSensor extends Thing {
  constructor({id, minTemperature, maxTemperature, delay}) {
    super({id, delay});
    this.temperature = new TemperatureComponent({minTemperature, maxTemperature})
  }
```

But you can imagine a DHT sensor like that:
```javascript
class TemperatureSensor extends Thing {
  constructor({id, minTemperature, maxTemperature, minHumidity, maxHumidity, delay}) {
    super({id, delay});
    this.temperature = new TemperatureComponent({minTemperature, maxTemperature})
    this.humidity = new HumidityComponent({minHumidity, maxHumidity})
  }
```

- a thing must have:
  - a constructor
  - a `generateData()` method
    - This method is called at a frequency defined by `delay`
    - you start the data generation/simulation like that: `thing.start("generateData")` (so, you can name `generateData` otherwise)
  - a `getData()` method
    - you call this method when you want sone values/informations about the sensor (eg inside an api)
    - :warning: `getData()` does not trigger `generateData()`
      - `generateData()` is called by a kind of worker
      - see `start()` method of https://github.com/bots-squad/creatures/blob/master/mum/Thing.js

### Instantiate "a lot of" sensors

See `main.js`

> Eg: "I want 100 humidity sensors"
```javascript
// Generate n humidity sensors
let humiditySensors = [...Array(100).keys()].map(item => {
  let h = new HumiditySensor({id:`h${item}`, delay:randomDelay()});
  h.start("generateData");
  return  h;
});
```

### Create an "API" to get the sensors data

See `main.js`

> Eg: "I want to get all temperature sensors"
```javascript
app.get('/sensors/temperature', authorized, (req, res) => {
  res.send(temperatureSensors.map(sensor => sensor.getData()));
});
```

## Add a new sensor

- You have to make a Pull Request
- When I will merge it on `master`, your new sensor will be automatically deployed on http://creatures.cleverapps.io

## ToDo

- security (key in the header)
- "swaggify" the API
- add other REST Methods to the Things (eg: `POST`)
- add other protocols (eg: CoAP, MQTT, ...)
- add "boids" (moving sensors)
- refactoring
- ...
