const config = require('dotenv/config');
const tmi = require('tmi.js');
const lista = require('./commands/lista');

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


   

  client.on('chat', (channel, user, message, self) => {
	  if(self) return;
	  const msgSplited = message.toLowerCase().split(' ');
	  const cmd = msgSplited[0];
	  for (let item of lista) {
		if (cmd === `!${item.cmd}`) {
		  item.func(client, channel, user, message);
		}
	  }
  });


  