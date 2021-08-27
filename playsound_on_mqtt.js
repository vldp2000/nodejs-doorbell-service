const config = require('./config')
var mqtt = require('mqtt');
const player = require('play-sound')();
var count = 0;
var client  = mqtt.connect(config.mqttHost ,{clientId: config.mqttClientId});
console.log("connected flag  " + client.connected);

//handle incoming messages
client.on('message',function(topic, message, packet){
    if (topic) {
        console.log("topic is "+ topic);
        console.log("message is "+ message);        
        if (topic == config.motionSensorTopic) {
            player.play(config.motionAlarmSound, (err) => {
                if (err) console.log(`Could not play sound: ${err}`);   
            });
        } else if (topic == config.doorbellTopic ) {
            player.play(config.doorbellSound, (err) => {
                if (err) console.log(`Could not play sound: ${err}`);   
            });
        } else {
            console.log("Unknown topic");
        }
    }
});


client.on("connect",function(){	
    console.log("connected  "+ client.connected);
})
//handle errors
client.on("error",function(error){
    console.log("Can't connect" + error);
    process.exit(1)
});

//publish
function publish(topic,msg,options){
    console.log("publishing",msg);
    if (client.connected == true){
	    client.publish(topic,msg,options);
    }
    count+=1;
    if (count==2) //ens script
        clearTimeout(timer_id); //stop timer
    client.end();	
}

//////////////

var options={
    retain:true,
    qos:1
};

//var topic = config.motionSensorTopic;
//client.subscribe(topic,{qos:1}); //single topic

var topic_list=[config.motionSensorTopic, config.doorbellTopic];
client.subscribe(topic_list,{qos:1}); //topic list
//var topic_o={"topic22":0,"topic33":1,"topic44":1};
console.log("subscribing to topics");
//client.subscribe(topic,{qos:1}); //single topic
//client.subscribe(topic_list,{qos:1}); //topic list
//client.subscribe(topic_o); //object
//var timer_id=setInterval(function(){publish(topic,message,options);},5000);
//notice this is printed even before we connect
console.log("end of script");