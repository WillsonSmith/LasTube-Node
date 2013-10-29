//Routes
var FMapiKey = require('../../routes/apiKey').FMapiKey;
var YTapiKey = require('../../routes/apiKey').YTapiKey;
console.log(FMapiKey);
console.log(YTapiKey);
var artists,
	username,
	error,
	ermessage,
	apikey = FMapiKey,
	youtubeApiKey = YTapiKey,
	// add these keys as a separate file for github
	youtubeBaseURL = 'https://www.googleapis.com/youtube/v3/'
	NodeCache = require('node-cache'),
	myCache = new NodeCache();
	//search?q=query&part=id&key=


	function youtubeQuery(query, cback){

		//var query = youtubeBaseURL + 'search?q=' + query + '&part=id&key=' + youtubeApiKey,
		var http = require('https'),
		options = {

			host: 'www.googleapis.com',
			path: '/youtube/v3/search?q=' + encodeURIComponent(query) + '&part=id&key=' + youtubeApiKey

		};

		callback = function(response){

			var str = '';

			response.on('data', function(chunk){

				str += chunk;

			});

			response.on('end', function(){

				cback(str);

			});

		}

		http.request(options, callback).end();




	}

	function getUser(username, callback){
		var body = '',
		options = {
		host: 'ws.audioscrobbler.com',
		port: 80,
		path: '/2.0/?method=user.gettopartists&user=' + username + '&format=json&limit=20&api_key=' + apikey
		},

		image;

		username = username || 'WillsonSM';

		/*callback = callback || function(){

			res.render('index', { title: 'LasTube' });

		};
*/		var theData;

		myCache.get( username, function( err, value ){

			theData = value;

			//cache testing
			//theData = '';

		});

		if (theData[username]){ //check if data cached
			console.log(theData[username]);
			artists = theData[username].topartists.artist;
			image = artists[1].image[1];
			callback();

		}else{

			//console.log('test');
			require('http').request(options, function(res) {
				res.setEncoding('utf8');

				res.on('data', function(chunk) {

					body += chunk;

				});

				res.on('end', function() {

					var loadedCount = 0;

					body = JSON.parse(body);
					//console.log(body);
					error = body.error;
					ermessage = body.message;

					myCache.set( username, body, 604800);

					if (!error){

						artists = body.topartists.artist;
						image = artists[1].image[0];
						//may have to save these images for rate limit reasons


						artists.forEach(function(artist, index){

							youtubeQuery(artist.name, function(e, index){
								e = JSON.parse(e);

								for (var i = 0; i < e.items.length; i++){

									if (e.items[i].id.videoId && loadedCount <= 20){

										artist.youtubeURL = e.items[i].id.videoId;
										loadedCount += 1;
										i = e.items.length;

									}

									if (loadedCount === 20){

										callback();

									}

								}

							});

						});

					}

				});

			}).end();

		}
	}

exports.index = function(req, res){

  res.render('index', { title: 'LasTube' });

};

exports.getNamed = function(req, res){

	function render(title, theartist){

		if (!title || !theartist){

			res.render('error', { title: 'Error' });

		}else{

			res.render('user', { title: title, artists: theartist});

		}

	}

	username = req.params.name;


	getUser(username, function(){

		render(username, artists);

	});
	};
