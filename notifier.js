const mqtt = require('mqtt');
const dotenv = require('dotenv');

const deviceRoot = 'root/';

dotenv.config();
const client = mqtt.connect({
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT
});

client.on('connect', (err) => {
  if (err.errorCode === -1) return console.error(err);
  client.subscribe(`${deviceRoot}appointments`);
  client.subscribe(`${deviceRoot}appointments/*`);
  console.log(' >> Notifier subscribed...');
});

client.on('message', (topic, message) => {
  console.log(topic);
  message = JSON.parse(message);
  console.log(message);
});