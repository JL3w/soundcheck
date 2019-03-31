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

//Variable used to add data from user input back to firebase databse
var database = firebase.database();

//event to grab the input from search bar and clear (needs to change if we dont use a button)
var relatedArtists = [];

//call last.fm API
$("#submit").on("click", function(event) {
  $("#a").empty();
  event.preventDefault();
  var artist = $("#input-form").val().trim();
  function displayrelart() {

  var queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artist + "&limit=10&api_key=424ba3add1c40d8f176064e658978ecb&format=json";

  var headline = $("<h3 class = 'related-head'>").text("Similar Artists");
  $("#a").append(headline);

  // Ajax call to return a promise
  $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
      if (response.error) {
        $(headline).text(response.message).css({"color": "rgba(223, 13, 13, 0.877)", "text-shadow": "1px 1px black"});
        return;
      }
    var data = response.similarartists.artist
    for (i =0; i < data.length; i++) {
      var artname = data[i].name;
      relatedArtists.push(data[i].name)
      var artlink = data[i].url;
      var artimag = Object.values(data[i].image[5]);
     
      // Variables used to create an element node and append info
      // to display artist image and link to "Learn More"
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


     $("#a").append(artBox);
    };

    // Scroll/function used to scroll through related artist in left column
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
        .addTo(controller);
      });
    
  });


  };
  displayrelart();
  $("#form")[0].reset();
  });
var favartistarray = [];

// Function used to add related artist(s) to favorite section
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
  $("#b2").append(favDiv);
});

// Function used to retrieve API response from Bands in Town and Last FM
// These API calls are used to add href's that link to the artist page and tour dates
$(document).on("click", ".artists", function(event) {
  event.preventDefault();
  var artist2 = $(this).attr("data-name");
  var queryURL = "https://rest.bandsintown.com/artists/" + artist2 + "?app_id=codingbootcamp";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var artistName = $("<h2>").text(response.name);
    var artistURL = $("<a>").attr("href", 'https://www.last.fm/music/' + response.name).append(artistName).attr("target", "_blank");    var artistImage = $("<img>").attr("src", response.thumb_url);
    var trackerCount = $("<h4>").text(response.tracker_count + " fans tracking this artist");
    var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
    var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates").attr("target", "_blank");

    $("#b1").empty();
    $("#b1").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);
   
  });
});




