# liri-node-app
Language Interpretation and Recognition Interface. LIRI responds to simple user commands and returns valuable information for them.

##liri commands
* spotify-this-song (song title)
  * Returns album, artist, and title information for the track searched
  * Uses the Spotify API and node-spotify-api package
  * If no song is entered by user, searches for "The Sign" By Ace of Base
* my-tweets
  * Displays the most recent tweets with timestamp for a specified account
  * Uses the twitter API and twitter node package
* movie-this (movie name)
  * Allows users to search for movies in the OMDB Database
  * Returns information like year, ratings, languages, and summary
  * Uses the omdb api
* do-what-it-says
  * reads the file random.txt and does what it does what it says
  * text of document is a command above


##Node Packages Used
* [request](https://www.npmjs.com/package/request)
* [node-spotify-api](https://www.npmjs.com/package/node-spotify-api)
* [twitter](https://www.npmjs.com/package/twitter)
* fs

##APIs Used
* [Twitter](https://developer.twitter.com/en/docs)
* [Spotify](https://developer.spotify.com/web-api/)
* [OMDB](http://www.omdbapi.com/)
