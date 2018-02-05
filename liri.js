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
var userSearch = process.argv[3];


switch (command) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    spotifyThis();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("please enter a valid request");
}

//////////////////////////// FUNCITONS /////////////////////////////////////////




function myTweets() {
  //create a variable to hold the parameter (user screen name)
  var params = {
    screen_name: 'frasiertheme',
    count: 20
  };
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
  //check to see if user entered a search term
  //if not - search Ace of Base's 'The Sign'
  if (!userSearch) {
    userSearch = "Ace of Base the Sign";
  }
  if (process.argv.length > 4) {
    for(i=4; i<process.argv.length; i++){
      userSearch += " " + process.argv[i];
      console.log(userSearch);
    }
  }
  //spotify search and return info
  spotify.search({
    type: 'track',
    query: userSearch,
    limit: 10
  }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    for (var i = 0; i < data.tracks.items.length; i++) {
      var currentTrack = data.tracks.items[i];
      console.log("============================================================");
      console.log("Song: " + currentTrack.name);
      console.log("Artist: " + currentTrack.artists[0].name);
      console.log("Album: " + currentTrack.album.name);
      console.log("Preview link: " + currentTrack.preview_url);
    };
  });
};

function movieThis() {
  //check to see if user entered a search term
  //if not - search 'Mr. Nobody'
  if (!userSearch) {
    userSearch = "Mr+Nobody";
  }
  if (process.argv.length > 4) {
    for(i=4; i<process.argv.length; i++){
      userSearch += "+" + process.argv[i];
      console.log(userSearch);
    }
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {
    // Check for errors
    if (error) {
      return console.log('Error occurred: ' + error);
    } else {
      //Return movie data
      var movieInfo = JSON.parse(body);
      console.log("Title: " + movieInfo.Title);
      console.log("Year: " + movieInfo.Year);
      console.log("IMDB Rating: " + movieInfo.imdbRating);
      console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
      console.log("Country: " + movieInfo.Country);
      console.log("Language: " + movieInfo.Language);
      console.log("Plot: " + movieInfo.Plot);
      console.log("Actors: " + movieInfo.Actors);
    };
  });
};


function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    } else {
      // We will then print the contents of data
      var dataArr = data.split(",");
      
      command = dataArr[0];
      userSearch = dataArr[1];

      switch (command) {
        case "my-tweets":
          myTweets();
          break;
        case "spotify-this-song":
          spotifyThis();
          break;
        case "movie-this":
          movieThis();
          break;
        default:
          console.log("please enter a valid request");
      };

    }
  });

}
