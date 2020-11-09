// importando comandos
const git = require('./git');
const ola = require('./ola')
const dado = require('./dado');

module.exports = [
    {
        cmd: 'ola',
        description: 'Dizer ola!',
        func: (client, channel, user) => ola(
          client,
          channel,
          user
        )
    },

    {
        cmd: 'git',
        description: 'Mosta o github',
        func: (client, channel) => git(client, channel)
    },

    {
        cmd: 'roll',
        description: 'Rola 1 D 6',
        func: (client, channel, user, message) => dado(
            client,
            channel,
            user,
            message
          )
    }
]