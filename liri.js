var keys = require('./config/keys');
var inquirer = require('inquirer');
var say = require('say');

var SpotifyConnection = require('node-spotify-api');
 
var spotify = new SpotifyConnection({
  id: keys.id,
  secret: keys.secret
});

function spotifySong() {
	inquirer.prompt({
		name: 'song',
		message: 'What is the song title?'
	}).then(function(answer) {
		var song = answer.song;
		
		spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
		 
			var tracks = data.tracks.items; // Array of tracks -- Each track is an object

			for ( var i = 0; i < tracks.length; i++ ) {
				var preview_url = tracks[i].preview_url ? tracks[i].preview_url : 'Preview URL not available';

				console.log('Song Name: ' + tracks[i].name + '\n' + 'Preview URL: ' + preview_url);
			}
			getCommand();
		});
	});
}

function getCommand() {
	inquirer.prompt({
		name: 'command',
		type: 'rawlist',
		message: 'What command would you like to run?',
		choices: ['Search for a song', 'Say something']
	}).then(function(answer) {
		var command = answer.command;

		switch(command) {
			case 'Search for a song':
				spotifySong();
				break;
			case 'Say something':
				say.speak('I have now hacked your computer, ha ha ha');
				getCommand();
		}
	});
}

getCommand(); // Ask the user which command they want to run initially

 
// if ( process.argv[2] == 'spotify-this-song' ) {
// 	var song_name = process.argv[3]; // string
// 	// console.log(song_name);

// 	spotify.search({ type: 'track', query: song_name, limit: 1 }, function(err, data) {
// 	  if (err) {
// 	    return console.log('Error occurred: ' + err);
// 	  }
	 
// 		var tracks = data.tracks.items; // Array of tracks -- Each track is an object

// 		for ( var i = 0; i < tracks.length; i++ ) {
// 			console.log('Song Name: ' + tracks[i].name + '\n' + 'Preview URL: ' + tracks[i].preview_url);
// 		}
// 	});
// } 

// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// 	var tracks = data.tracks.items; // Array of tracks -- Each track is an object

// 	for ( var i = 0; i < tracks.length; i++ ) {
// 		console.log(tracks[i].preview_url);
// 	}
// });

// var parent_obj = {
// 	name: 'JD',
// 	age: 38,
// 	hobbies: [
// 		{
// 			name: 'pingpong'
// 		},
// 		{
// 			name: 'music'
// 		}
// 	]
// };

// console.log(parent_obj.hobbies[1]);






















// console.log(keys);

// process.env = 'production';

// process.env.NODE_ENV = 'development';

// console.log(NODE_ENV);

// constants do not, or should never change
