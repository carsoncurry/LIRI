require("dotenv").config();

var keys = require("./keys");

var request = require('request');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var moment = require('moment');

var firstInput = process.argv[2];
var secondInput = process.argv[3];

switch (firstInput) {
    case "concert-this":
        searchConcert(secondInput);
        break;

    case "spotify-this-song":
        searchSpotify(secondInput);
        break;

    case "movie-this":
        searchMovies(secondInput);
        break;

    case "do-what-it-says":
        liriSays(secondInput);
        break;
}

// Spotify Function
function searchSpotify(secondInput) {
    var spotify = new Spotify(keys.spotify);

    if (!secondInput) {
        secondInput = 'The Sign';
    }

    spotify.search(
        {type: 'track', query: secondInput},
        function(err, data) {
            if (err) {
                console.log("Error: " + err);
                return;
            }

            var songInfo = data.tracks.items;
            console.log("Artist(s): " + songInfo[0].artists[0].name);
            console.log("Song: " + songInfo[0].name);
            console.log("Preview Link: " + songInfo[0].preview_url);
            console.log("Album: " + songInfo[0].album.name);
        });
}

// Bands in Town Function
function searchConcert(secondInput) {
    var queryURL = "https://rest.bandsintown.com/artists/" + secondInput + "/events?app_id=codingbootcamp";

    request(queryURL, function(error, response, body) {
        if (error) console.log(error);

        var result = JSON.parse(body)[0];
        console.log("Venue Name: " + result.venue.name);
        console.log("Venue Location: " + result.venue.city);
        console.log("Event Date: " + moment(result.datetime).format("MM/DD/YYYY"));
    })
}

// OMDB Function
function searchMovies(secondInput) {
    var queryURL = "https://www.omdbapi.com/?t=" + secondInput + "&y=&plot=short&apikey=trilogy";

    request(queryURL, function(error, response, body) {
        if (!secondInput) {
            secondInput = "Mr. Nobody";
        } if (!error && response.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Cast: " + JSON.parse(body).Actors);
        }
    });
};

// Do What LIRI Says Function
function liriSays() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            return console.log(error);
        }

        var dataArr = data.search(",");

        if (dataArr[0] === 'spotify-this-song') {
            var songcheck = dataArr[1].slice(1, -1);
            searchSpotify(songcheck);
        }
    });
}