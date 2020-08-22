# steam-workshop-follow-bot
Node Steam Workshop follow bot for boosting followers on your workshop page

[![GitHub followers](https://img.shields.io/github/followers/Dasrg?label=Follow&style=social)](https://github.com/Dasrg)
[![streamlabs](https://img.shields.io/badge/Donate-%241-red)](https://streamlabs.com/das-Dme6dF/tip)
[![nodejs](https://img.shields.io/badge/node.js-v12-brightgreen)](https://nodejs.org/)

<b>Installing:</b>
1. Install <a href="https://nodejs.org/">Node.js LTS version</a>
2. Download this repo (click `Code -> Download ZIP`) and unpack the archive.
3. Open command prompt or PowerShell in the bot folder (`Shift + Right Click`, or `cd 'path to the bot'`)
4. Type `npm i` or `npm install`

<b>Using:</b>
1. Add to the `bot.txt` textfile accounts login data (`login:password:` in the each line with the colon). You can get this accounts using Steam Account Generator.
2. Configure the bot in the `config.json` file:

   - Set link to your steam profile in the `target` parameter.
   - Set SteamID your steam profile in the `steamid` parameter. You must enter `steamid` of the `target` account.
   - Enter in `perChunk` how many authorizations you want at the same time.
   - Enter in `betweenChunks` time delay between the chunks in milliseconds.
   - `amount` - how many followers you want. No more than amount of bots in the `bots.txt`. If you leave `amount: 0` bot will use amount of steam accounts in the `bots.txt`.

Config example:
```
{
	"target": "https://steamcommunity.com/id/gunthersuper",
	"steamid": "76561198261256059",
	"perChunk": 3,
  "betweenChunks": 5000,
	"amount": 0
}

```

3. Run the bot - type in the command prompt or PowerShell: `node index.js`
