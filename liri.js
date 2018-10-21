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

            var result = data.tracks.items;
            console.log("Artist(s): " + result[0].artists[0].name);
            console.log("Song: " + result[0].name);
            console.log("Preview Link: " + result[0].preview_url);
            console.log("Album: " + result[0].album.name);
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

            var result = JSON.parse(body);
            console.log("Title: " + result.Title);
            console.log("Release: " + result.Year);
            console.log("IMDB Rating: " + result.imdbRating);
            console.log("Rotten Tomatoes Rating: " + result.Ratings[1].Value);
            console.log("Country: " + result.Country);
            console.log("Language: " + result.Language);
            console.log("Plot: " + result.Plot);
            console.log("Cast: " + result.Actors);
        }
    });
};

// Do What LIRI Says Function
function liriSays() {
    fs.readFile('random.txt', "utf8", function(error, data) {
        var txt = data.split(',');

        searchSpotify(txt[1]);
    });
};