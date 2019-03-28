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
      var artimag = Object.values(data[i].image[1]);
     
      var artDiv = $("<div class = 'relart'>");
      var imgDiv = $('<img>');
      imgDiv.attr('src', artimag);
      artDiv.append(imgDiv);
      var infoDiv = $("<div class = 'art-info'>");
      var nameDiv = $('<h4>').text(artname);
      var moreDiv = $("<button>").text("Learn More");
      var plusSpan = $("<span>").text("Fav")
      plusSpan.attr("data-name", data[i].name);
      plusSpan.addClass("fas fa-plus");
      plusSpan.addClass("favartist");
      moreDiv.attr("data-name", data[i].name);
      moreDiv.addClass("artists");
      infoDiv.append(nameDiv);
      infoDiv.append(moreDiv);
      infoDiv.append(plusSpan);

      var artBox = $("<div class = 'art-box'>");
      artBox.append(artDiv);
      artBox.append(infoDiv);

     // var link = $("<a>").text("Link").attr("href", artlink);
     // artDiv.append(link);
      $("#a").append(artBox);
    };

    var controller = new ScrollMagic.Controller({
      container: "#a"
      });
      
      $('.art-box').each(function () {
      var tween = TweenMax.from($(this), 0.3, {
        autoAlpha: 0,
        scale: 0.5,
        y: '+=30'
      });
      
      var scene = new ScrollMagic.Scene({
          triggerElement: this,
          duration: '90%',
          triggerHook: 0.8
        })
        .setTween(tween)
        .addIndicators({
          parent: "#a"
        })
        .addTo(controller);
      });
    
  });


  };
  displayrelart();
  $("#form")[0].reset();
  });
var favartistarray = [];

$(document).on("click", ".favartist", function(event) {

  event.preventDefault();
  var artist3 = $(this).attr("data-name");
  var favaristobj = {
    favartist: artist3
  };
  database.ref().push(favaristobj);
  var favDiv = $("<div class = 'favart'>");
  var favnameDiv = $("<p>").text(artist3);
  favnameDiv.attr("data-name", artist3);
  favnameDiv.addClass("favartists");
  favDiv.append(favnameDiv);
  $("#b2").prepend(favDiv);
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
    var trackerCount = $("<h4>").text(response.tracker_count + " fans tracking this artist");
    var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
    var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

    $("#b1").empty();
   // $("#").empty();
    $("#b1").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);
   
  });
});





