const path = require('path')

module.exports = {
  mqttHost: 'mqtt://192.168.17.5',
  mqttClientId:'playsoundmqttjs01',
  doorbellTopic: 'Sec/DoorBell/STATE',
  doorbellId: 'EBC02E',
  motionSensorTopic: 'Motion/FrontDoor/STATE',
  motionSensorId: 'EBC02E1',
  doorbellSound: './media/doorbell-1.mp3',
  motionAlarmSound: './media/alarm1.mp3'
}