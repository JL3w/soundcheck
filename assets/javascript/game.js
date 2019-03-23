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
        var jerks = "#text"
        console.log(data[i].name);
        console.log(data[i].url);
        console.log(data[i].image[2]);
        var artname = data[i].name;
        var artlink = data[i].url;
        var artimag = data[i].image[2];
       
  
        var artDiv = $("<div class = 'relart'>");
        var nameDiv = $("<p>").text(artname);
        artDiv.append(nameDiv);
        
       // var link = $("<a>").text("Link").attr("href", artlink);
       // artDiv.append(link);
  
        
        
  
    
  
        $("#related").append(artDiv);
      };
      
      
     
    });
    
  };
  displayrelart();
  });