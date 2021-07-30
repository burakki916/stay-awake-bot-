const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});
var PingingChannel;
let usersMap = new Map(); 
class userInfo{
    constructor(author){
        this.awake = true;  
        this.timeOfSleep = "NULL"; 
        this.authorInfo = author; 
    }
}
client.on('message',message =>{
    if(message.content === 'r!start'){
        message.channel.send('new user added!'); 
        PingingChannel = message.channel; 
        usersMap.set(message.author.id , new userInfo(message.author) );  
    }
    if(message.content === 'r!ls'){
        let data = ""; 
        for(const [key,value] of usersMap){
            if(value.awake == true){
                data+=value.authorInfo.username +  " : "  + " Awake "
            } else {
                data+=value.authorInfo.username +  " : "  + " Asleep  TIME : " + value.timeOfSleep;
            }
            data+= " \n \n";
        }
        message.channel.send(data);
    }
    if(message.content == "r!awake"){
        if(usersMap.has(message.author.id)){
        usersMap.get(message.author.id).awake = true; 
        usersMap.get(message.author.id).timeOfSleep = "NULL"; 
        message.channel.send("Got it! " + message.author.username + " is awake!");
        } else {
            message.channel.send("Sorry, You're not registered into the system! please do r!start to register")
        }
    }
    for(let i = 0; i<message.content.length;i++){
        let intervalCommand = "r!si";
        if(message.content[i]== intervalCommand[i]){
            if(i==intervalCommand.length-1){
                let newInterval = "";
                for(let j = i+2; j<message.content.length;j++){
                    newInterval +=message.content[j];
                }
                if(newInterval.match(/^[0-9]+$/) != null){
                    message.channel.send("New Interval Set to " + newInterval + "!");
                    setInterval(pinging,newInterval); 
                } else {
                    message.channel.send("You need to input a number! " + newInterval + " May not be a number");
                }
                
            }
            continue;
        }else{
            break; 
        }
    }
});
setInterval(pinging, 1800000);
function pinging(){
    let data = "Pinging Awake Users! \n"; 
    for(const [key,value] of usersMap){
        if(value.awake == true){
            data +='<@'+ value.authorInfo.id + '>' + " ";
            value.awake = false;
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time; 
            value.timeOfSleep = dateTime; 
        } 
    }
    if(data.length!=0){
        data+= "\n please type r!awake to confirm that you are awake!"; 
        if(PingingChannel != null){
            PingingChannel.send(data);
        }
        
    }
}
const fs = require('fs')
let key = '';
fs.readFile('src/token.env', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  client.login(data);
})


