LasTube-Node
============

[Example](http://dry-earth-7323.herokuapp.com/WillsonSM)

LasTube written as a node.js/express.js application. An effort to offload some of the work on to the server.

This project uses a url as such: `localhost:3000/lastFMUsername` to retrieve the top 20 artists of a lastFM user. At the current time, each one will link to a youtube video of that artist (ideally, there are some downfalls with how I search)

To use this, you must have both a lastFM API key: [Get here](http://www.last.fm/api)
And a youtube API key: [Here](https://developers.google.com/youtube/v3/)

Include a file called apiKey.js in a root folder above the directory of this project. eg. `home/lasTube-Node`, you would include it in `home`. and change:

	var FMapiKey = require('../../routes/apiKey').FMapiKey;
	var YTapiKey = require('../../routes/apiKey').YTapiKey;
	
To point to the directory you wish to use (this is located in the index.js route [routes/index.js])

The api key file should look as such:

	var FMkey = 'lastfmKey';
	var YTkey = 'youtubeKey';
	
	module.exports.FMapiKey = FMkey;
	module.exports.YTapiKey = YTkey;
	
