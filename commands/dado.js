
function randomInt(min, max) {
	return min + Math.floor((max) * Math.random());
}


module.exports = (client, channel, user) => client.say(channel, `@${user.username} rolou ${randomInt(1,6)}!`)