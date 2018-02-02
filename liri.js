require("dotenv").config();

//set up require variables
var keys = require('./keys.js');
var fs = require('fs');
var request = require('request');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

//set up API variables
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

switch (command) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    spotifyThis();

    break;
  case "movie-this":
    //This will output the following information to your terminal/bash window:
    // Title of the movie.
    //Year the movie came out.
    //IMDB Rating of the movie.
    //Rotten Tomatoes Rating of the movie.
    //Country where the movie was produced.
    //Language of the movie.
    //Plot of the movie.
    //Actors in the movie.
    //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    //You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.
    break;
  case "do-what-it-says":
    //Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    //It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
    //Feel free to change the text in that document to test out the feature for other commands.
    break;
  default:
    console.log("please enter a valid request");
}

//// FUNCITONS
function myTweets() {
  //create a variable to hold the parameter (user screen name)
  var params = {screen_name: 'frasiertheme'};
  //call the twitter npm
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
    //loop through the first 20 tweets and log their text and time created
      for (var i = 0; i < 20 && i < tweets.length; i++) {
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
      }
    }
  });
}

function spotifyThis() {
  var userSearch = process.argv[3]
  spotify.search({
    type: 'track',
    query: userSearch,
    limit: 10
  }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    for(var i = 0; i < data.length; i++){
    var trackObj = {
         Artist: data.tracks.items[0].artists[0].name,
         "Song Name": data.tracks.items[0].name,
         "Preview Link": data.tracks.items[0].preview_url,
         "Album": data.tracks.items[0].album.name
     };
     console.log(JSON.stringify(trackObj, null, 2));
   };
  });

  //This will show the following information about the song in your terminal/bash window
  //Artist(s)
  //The song's name
  //A preview link of the song from Spotify
  //The album that the song is from
  //If no song is provided then your program will default to "The Sign" by Ace of Base.
}
