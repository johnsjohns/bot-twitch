const config = require('dotenv/config');
const tmi = require('tmi.js');

opt = {
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: process.env.BOT_USERNAME,
		password: process.env.OAUTH_TOKEN
	},
	channels: [ process.env.CHANNEL_NAME ],
}


const client = new tmi.Client(opt);
const channel = opt.channels[0];


client.connect().catch(console.error);
client.on('connected', onConnectedHandler);
function onConnectedHandler (addr, port) {
	console.log(`* Connected to ${addr}:${port}`);
  }

  function messageIncoming(channel, tags, message, self){
	
	if(self) return;
	if(message.toLowerCase() === '!hello') {
		client.say(channel, `@${tags.username}, heya!`);
	}
	if(message.toLowerCase() === '!ola'){
		client.say(channel, `Ola @${tags.username}, seja bem vindo!`);
	}	


}
   
  client.on('message', messageIncoming);


  