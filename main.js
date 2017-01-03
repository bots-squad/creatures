const express = require('express');
const bodyParser = require('body-parser');

const TemperatureSensor = require('./things/TemperatureSensor').TemperatureSensor;
const HumiditySensor = require('./things/HumiditySensor').HumiditySensor;

let http_port = process.env.PORT || 8888;
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let randomDelay =  () => {
  let getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  return getRandomInt(1500, 4000);
}

// temporary: always authorized
let authorized = (req, res, next) => {
  return next();
  /*
  if (req.headers['things-signature']==process.env.PASS_WORD) {
    return next();
  } else {
    return res.sendStatus(401);
  }
  */
}

// Generate n temperature sensors
let temperatureSensors = [...Array(100).keys()].map(item => {
  let t = new TemperatureSensor({id:`t${item}`, minTemperature:-10, maxTemperature:10, delay:randomDelay()});
  t.start("generateData");
  return  t;
});

// Generate n humidity sensors
let humiditySensors = [...Array(100).keys()].map(item => {
  let h = new HumiditySensor({id:`h${item}`, delay:randomDelay()});
  h.start("generateData");
  return  h;
});


app.get('/sensors', authorized, (req, res) => {
  res.send({
    temperatureSensors: temperatureSensors.map(sensor => sensor.getData()),
    humiditySensors: humiditySensors.map(sensor => sensor.getData())
  });
});

app.get('/sensors/temperature', authorized, (req, res) => {
  res.send(temperatureSensors.map(sensor => sensor.getData()));
});

app.get('/sensors/temperature/:id', authorized, (req, res) => {
  let sensor = temperatureSensors.find(sensor => sensor.id == req.params.id);
  if(sensor) { res.send(sensor.getData()) } else { res.sendStatus(404) };
});

app.get('/sensors/humidity', authorized, (req, res) => {
  res.send(humiditySensors.map(sensor => sensor.getData()));
});

app.get('/sensors/humidity/:id', authorized, (req, res) => {
  let sensor = humiditySensors.find(sensor => sensor.id == req.params.id);
  if(sensor) { res.send(sensor.getData()) } else { res.sendStatus(404) };
});

app.listen(http_port)

console.log(`Listening on ${http_port}`);
