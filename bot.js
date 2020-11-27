const config = require('dotenv/config');
const tmi = require('tmi.js');
const lista = require('./commands/lista');
const conexao = require('./infra/db/conexao');
const Tabelas = require('./infra/db/tabelas');
const Usuario = require('./infra/model/usuario');


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

conexao.connect(erro => {
	if(erro){
		console.log(erro);
	} else {
		console.log('conectado com sucesso ao db');
		Tabelas.init(conexao);
		client.connect().catch(console.error);
		client.on('connected', onConnectedHandler);
		function onConnectedHandler (addr, port) {
			console.log(`* Connected to ${addr}:${port}`);
			Usuario.reset();
		};

		client.on('join', (channel, user) => {
			const usuario = {
				'cliente' : user,
				'status' : 'on',
				'pontos' : 0
			}
			
			Usuario.listaByName(user, resultado => {
					var verifica = resultado;
					if(verifica == undefined){
						Usuario.adiciona(usuario);
					} else { 
						Usuario.altera(verifica.id, {'status' : 'on'} , (erro, resultado => {
							if(erro){
								console.log(erro);
							} else {
								console.log(`${verifica.cliente} entrou!!`)
							}
						}))
					}
				}
			)
			
				
		});

		client.on('part', function(channel, user){
			console.log("PARTED:  " + user);
			Usuario.listaByName(user, resultado => {
				var verifica = resultado;
					Usuario.altera(verifica.id,{'status' : 'off'}, (erro, resultado) => {
						if(erro){
							console.log(erro);
						} else {
							console.log(`${verifica.cliente} saiu!!`);
						}
					})
				
			}
		)
		});

		client.on("raw_message", (messageCloned, message) => {

			var teste = new RegExp('c+u+[l|1]+p+[a|4]');
			if(teste.test(message.params[1], 'i') && message.tags.id !== undefined){
				console.log("culpado: " + message.tags.id)
				client.deletemessage(channel, message.tags.id)
			}
		});

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

		
	}
})





  