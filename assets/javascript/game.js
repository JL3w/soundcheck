// //initialize firebase
var config = {
  apiKey: "AIzaSyBu8rTbNifHBZ0s0KA_5o7HDfIJTQ1pE7o",
  authDomain: "soundcheck-3312a.firebaseapp.com",
  databaseURL: "https://soundcheck-3312a.firebaseio.com",
  projectId: "soundcheck-3312a",
  storageBucket: "soundcheck-3312a.appspot.com",
  messagingSenderId: "402339358373"
};

firebase.initializeApp(config);

//set global variables
var database = firebase.database();

var relatedArtists = [];
//event to grab the input from search bar and clear (needs to change if we dont use a button)

//call last.fm API
$("#submit").on("click", function(event) {
  event.preventDefault();
  var artist = $("#input-form").val().trim();
  function displayrelart() {

  var queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artist + "&limit=10&api_key=424ba3add1c40d8f176064e658978ecb&format=json";

  $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    var data = response.similarartists.artist
    console.log(response)
    for (i =0; i < data.length; i++) {
      console.log(data[i].name);
      console.log(data[i].url);
      console.log(data[i].image[1]);
      var artname = data[i].name;
      relatedArtists.push(data[i].name)
      var artlink = data[i].url;
      var artimag = data[i].image[1];
     

      var artDiv = $("<div class = 'relart'>");
      var nameDiv = $("<button>").text(artname);
      var favDiv = $("<button>").text("+Fav")
      favDiv.attr("data-name", data[i].name);
      favDiv.addClass("favartists");
      nameDiv.attr("data-name", data[i].name);
      nameDiv.addClass("artists");
      artDiv.append(nameDiv);
      artDiv.append(favDiv);

      
     // var link = $("<a>").text("Link").attr("href", artlink);
     // artDiv.append(link);
      $("#related").prepend(artDiv);
    };
    
    
   
  });


  };
  displayrelart();
  });

$(document).on("click", ".favartists", function(event) {

  event.preventDefault();
  var artist3 = $(this).attr("data-name");
  var favDiv = $("<div class = 'favart'>");
  var favnameDiv = $("<p>").text(artist3);
  favnameDiv.attr("data-name", artist3);
  favnameDiv.addClass("favartists");
  favDiv.append(favnameDiv);
  $("#fav").prepend(favDiv);
});

$(document).on("click", ".artists", function(event) {
  event.preventDefault();
  var artist2 = $(this).attr("data-name");
  var queryURL = "https://rest.bandsintown.com/artists/" + artist2 + "?app_id=codingbootcamp";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var artistName = $("<h2>").text(response.name);
    var artistURL = $("<a>").attr("href", response.url).append(artistName);
    var artistImage = $("<img>").attr("src", response.thumb_url);
    var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
    var upcomingEvents = $("<h1>").text(response.upcoming_event_count + " upcoming events");
    var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

    $("#bit-div").empty();
    $("#bit-div2").empty();
    $("#bit-div").append(artistURL, artistImage, trackerCount);
    $("#bit-div2").append(upcomingEvents, goToArtist);
  });
});





