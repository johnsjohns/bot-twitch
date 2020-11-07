// importando comandos
const git= require('./git');
const ola = require('./ola')

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
    }
]