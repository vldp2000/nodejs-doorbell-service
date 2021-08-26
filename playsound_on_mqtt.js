var mqtt = require('mqtt');
const player = require('play-sound')();
var count = 0;
var client  = mqtt.connect("mqtt://192.168.17.5",{clientId:"playsoundmqttjs01"});
console.log("connected flag  " + client.connected);

//handle incoming messages
client.on('message',function(topic, message, packet){
	console.log("message is "+ message);
	console.log("topic is "+ topic);
    var obj = JSON.parse(message);
    if (obj) {
        console.log("Data =>>>" + obj.RfReceived.Data);
        player.play('./media/alarm1.mp3', (err) => {
            if (err) console.log(`Could not play sound: ${err}`);
        });
    }

    console.log(obj);
});


client.on("connect",function(){	
console.log("connected  "+ client.connected);

})
//handle errors
client.on("error",function(error){
console.log("Can't connect" + error);
process.exit(1)});
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
qos:1};
var topic="tele/Bridge1/RESULT";
var message="test message";
var topic_list=["topic2","topic3","topic4"];
var topic_o={"topic22":0,"topic33":1,"topic44":1};
console.log("subscribing to topics");
client.subscribe(topic,{qos:1}); //single topic
//client.subscribe(topic_list,{qos:1}); //topic list
//client.subscribe(topic_o); //object
//var timer_id=setInterval(function(){publish(topic,message,options);},5000);
//notice this is printed even before we connect
console.log("end of script");