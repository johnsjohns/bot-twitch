
function randomInt(min, max) {
	return min + Math.floor((max) * Math.random());
}

module.exports = (client, channel, user, message) => {
	let msg = message.split(' ');
	let msgErro = 'digite !dado <quantidade>d<lados>';
	if(msg.length < 2){
		client.say(channel, `@${user.username} ${msgErro}`);
		return;
	} else  {
		quantidade = msg[1].split('d')[0];
		lados = msg[1].split('d')[1];
		if(quantidade > 50){
			client.say(channel, `@${user.username} Você está querendo rolar dados demais, não acha?`);	
			return;
		} 

		if(lados > 100){
			client.say(channel, `@${user.username} Nossa! um dado de ${lados} lados?? ta maluco??`);
		} else {
			if (isNaN(quantidade) || isNaN(lados)){
				client.say(channel, `@${user.username} ${msgErro}`);
			} else {
				let total = 0;
				let dados = "";
				for(let i = 0; i < quantidade; i++){
					let dado = randomInt(1,lados);
					total += dado;
					dados += `(${dado}) `
				}

				client.say(channel, `@${user.username} rolou ${dados} total =  ${total}!`);

			}
		}
	}

}