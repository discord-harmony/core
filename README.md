# Discord-Harmony Core
Basic functionality test. The goal is to have one bot who's job is to manage other bots within a server. All the bots must be run on the same machine and talk to the controller bot over Standard I/O. An example `Minion` bot can be found [here](https://github.com/discord-harmony/ping). Currently the controller is written in nodejs and will require a recent install of it.

To run your own version of this first pull down this repository and run the command `npm install` from within it. Then navigate to the `minions` directory and follow the setup instructions for the [ping](https://github.com/discord-harmony/ping) bot. Before you can run anything you'll need to create a `.env` file that contains the bots discord token in the following format:
```
DISCORD_TOKEN="<Bots token>"
```

You can then run the controller bot with the command:
```
node app.js
```
