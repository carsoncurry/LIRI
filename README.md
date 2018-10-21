# LIRI-BOT

LIRI is a Langauge Interpretation and Recognition Interface that takes in user inputs to return a number of results. 
LIRI works as a command line node app that takes in parameters and gives you back data. 

To use this app you must first open the terminal and enter: 
  - node liri.js
 
Then you will enter one of four commands to receive data. Prompts and the returned data includes: 
  - 'concert-this' + [artist/band name]
    - Name of the venue
    - Venue location
    - Date of the Event
  - 'spotify-this-song' + [song name]
    - Artist(s)
    - Song Name
    - Spotify Preview Link
    - Album
  - 'movie-this' + [movie name]
    - Movie Title
    - Release Year
    - IMDB Rating
    - Rotten Tomatoes
    - Production Company
    - Movie's Language(s)
    - Plot
    - Cast
  - 'do-what-it-says'
    - A surprise result using one of the other three command inputs!

Technologies Used:
  - JavaScript
  - Node
  - Request
  - Moment
  - DotEnv

APIs Used: 
  - Spotify
  - Bands in Town
  - OMDB

Screenshots of the app working with all four command inputs are included in the appropriate repository folder 'screenshots'.
