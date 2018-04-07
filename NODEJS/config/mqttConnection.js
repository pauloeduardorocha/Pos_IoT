var mqtt = require('mqtt');
var client = mqtt.connect('tcp://localhost'); //inicia o mqtt

client.on('connect', function () {
   	 client.subscribe('topic-iot-cefetmg/#');//conecta e assina o tópico MQTT
     console.log('Conectado ao tópico "topic-iot-cefetmg"');
});

module.exports = client;
