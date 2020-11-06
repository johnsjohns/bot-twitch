const config = require('dotenv/config');

const tmi = require('tmi.js');
const client = new tmi.Client({
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: process.env.BOT_USERNAME,
		password: process.env.OAUTH_TOKEN
	},
	channels: [ process.env.CHANNEL_NAME ]
});
client.on('connected', onConnectedHandler);
client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
	if(self) return;
	if(message.toLowerCase() === '!hello') {
		client.say(channel, `@${tags.username}, heya!`);
	}
	
});


function onConnectedHandler (addr, port) {
	console.log(`* Connected to ${addr}:${port}`);
	client.say(process.env.CHANNEL_NAME, `Sejam bem vindos ao canal`);
  }
