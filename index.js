const SteamCommunity = require('steamcommunity');
const Colors = require('colors');
const path = require('path');
var async = require('async');
var fs = require('fs');
let config = null;

var community = new SteamCommunity();

var text = fs.readFileSync('./bots.txt').toString('utf-8');
var bot = text.split('\n')
config = require(path.resolve('config.json'));
let configRaw = fs.readFileSync('./config.json').toString();
const target = config.target;
const steamid = config.steamid;
const perChunk = config.perChunk;
const betweenChunks = config.betweenChunks;

console.log('%s is SteamID'.gray, steamid);

var success = 0; var failed = 0;

(async() => {
	// Getting chunks:
    let subbot = []; 
	if (config.amount != 0) bot.length = config.amount;
	for (let i = 0; i <Math.ceil(bot.length/perChunk); i++){
		subbot[i] = bot.slice((i*perChunk), (i*perChunk) + perChunk);
	}
	
	console.log('Total %s accounts and %s chunks'.cyan, bot.length, subbot.length);
	for (let ii = 0; ii < subbot.length; ii++) {
		
		var successChunk = 0;
		var failedChunk = 0;	

		async.each(subbot[ii], function(item, callback){
			// Using limited account with steam guard disabled for favorites:	
			const logOnOptions = {	accountName: item.split(":")[0], password: item.split(":")[1] };  
	
			community.login({
					"accountName": logOnOptions.accountName,
					"password": logOnOptions.password
			},
			function (err, sessionID, cookies, steamguard, oAuthToken) {
				if (err) { console.log('[%s] Unable to auth (Error: %s)'.red, logOnOptions.accountName, err); callback(); failedChunk++; failed++; }
				if (!err) {																
					console.log('[%s] Successfully logged on (Session ID: %s)'.yellow, logOnOptions.accountName, sessionID);

					var options = {
						formData: {	steamid: steamid, sessionid: sessionID },
						headers: { Cookie: cookies, Host: 'steamcommunity.com', Origin: 'https://steamcommunity.com' },
						json: true
					};
					community.httpRequestPost(
						config.target + '/followuser', options,
						function (err, res, data) {
							if (err) {
								console.log('[%s] Follow request faiked'.green, logOnOptions.accountName, err); failedChunk++; failed++;
								callback()
							}
							if (!err) {
								if (data.success == 1) { console.log('[%s] Follow request successfuly sent with response: %s'.green, logOnOptions.accountName, data.success); successChunk++; success++; }									
								if (data.success != 1) { console.log('[%s] Follow request failed with response: %s'.red, logOnOptions.accountName, data.success); failed++; failedChunk++; }
								callback()
							}							
						},
						"steamcommunity"
					);		
									
				}
			});
							
		}, function(err) {
				console.log('Chunk %s finished: Successfully sent %s follows and %s failed requests'.white, ii + 1, successChunk, failedChunk);			
		});
		if (ii < subbot.length) await new Promise(r => setTimeout(r, betweenChunks));
	};
	console.log('Successfully sent %s follows and %s failed requests'.black.bgWhite, success, failed);
		
})();
