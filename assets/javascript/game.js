// //initialize firebase
var config = {
  apiKey: "AIzaSyBlnKmbd7woLS7CoS_c6qXMsoG5rJm19Ds",
  authDomain: "group-project1-d7863.firebaseapp.com",
  databaseURL: "https://group-project1-d7863.firebaseio.com",
  projectId: "group-project1-d7863",
  storageBucket: "group-project1-d7863.appspot.com",
  messagingSenderId: "514017923014"
};
firebase.initializeApp(config);

//set global variables
var database = firebase.database();

var artist = "";
var relatedArtists = [];
//event to grab the input from search bar and clear (needs to change if we dont use a button)

//call last.fm API
$("#submit").on("click", function(event) {
  event.preventDefault();
  var artist = $("#input-form").val().trim();

  // code for pushing the searched artist to firebase
  database.ref().push({
    artist: artist,
  });
  // function to show the related artist in collumn one
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
      console.log(data[i].image[2]);
      var artname = data[i].name;
      relatedArtists.push(data[i].name)
      var artlink = data[i].url;
      var artimag = data[i].image[2];
     
      var artDiv = $("<div class = 'relart'>");
      var nameDiv = $("<button>").text(artname);
      nameDiv.attr("data-name", data[i].name);
      nameDiv.addClass("artists");
      artDiv.append(nameDiv);

      // 55-57 adds a plus sign button to the right of the related artists
      var plusSpan = $("<span>")
      plusSpan.attr("data-name", data[i].name);
      plusSpan.addClass("fas fa-plus");
      artDiv.append(plusSpan);
     // var link = $("<a>").text("Link").attr("href", artlink);
     // artDiv.append(link);
      $("#related").prepend(artDiv);
    };
    
    
   
  });
  
};
displayrelart();
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
    var artistName = $("<h1>").text(response.name);
    var artistURL = $("<a>").attr("href", response.url).append(artistName);
    var artistImage = $("<img>").attr("src", response.thumb_url);
    var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
    var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
    var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

    $("#bit-div").empty();
    $("#bit-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);
  });
});





