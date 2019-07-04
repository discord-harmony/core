const Discord = require('discord.js')
const client = new Discord.Client()
const spawn = require('cross-spawn')
require('dotenv').config()

minions = []

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  loadMinions()
})

client.on('message', msg => {
  if (msg.content === 'help') {
    response = 'The following bots and commands are loaded:'

    minions.forEach(minion => {
        response += "\n" + minion.name
        minion.info.commands.forEach(command => {
          response += "\n" + command.name + " - " + command.description
        })
    })

    msg.reply(response)
  }
})

function loadMinions() {
  const minionsDir = './minions/'
  const fs = require('fs')

  fs.readdirSync(minionsDir).forEach(file => {
    if (file !== '.gitkeep') {
      let startup = JSON.parse(fs.readFileSync("./minions/" + file + "/startup.json"))

      const minion = spawn(startup.command, [], {cwd: "./minions/" + file + "/"})

      minion.stdout.on('data', (data) => {
        minions.push(JSON.parse(data))
      })

      minion.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`)
      })

      minion.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
      })
    }
  })
}

client.login(process.env.DISCORD_TOKEN)
