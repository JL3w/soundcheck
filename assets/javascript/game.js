// //initialize firebase
var config = {
    apiKey: "AIzaSyCEg-Upy0iRu7zlio1PYG5XcO1n_ZytUWE",
    authDomain: "soundcheck-d819a.firebaseapp.com",
    databaseURL: "https://soundcheck-d819a.firebaseio.com",
    projectId: "soundcheck-d819a",
    storageBucket: "",
    messagingSenderId: "495393839277"
};

firebase.initializeApp(config);

//set global variables
var database = firebase.database();


//event to grab the input from search bar and clear (needs to change if we dont use a button)

//call last.fm API

//use data from last.fm API to call bands in town API
    //set response variables

//upload data to database
database.ref().push(//input var name//);

//firebase event to add data to database & upload html
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    //Store data in variables
    var //var name = childSnapshot.val().;

    //update html
})




// Video JS
var video = document.querySelector('video')
  , container = document.querySelector('#vid-container');
 
var setVideoDimensions = function () {
  // Video's intrinsic dimensions
  var w = video.videoWidth
    , h = video.videoHeight;
   
  // Intrinsic Ratio
  // Will be more than 1 if W > H and less if W < H
  var videoRatio = (w / h).toFixed(2);
   
  // Get the container's computed styles
  //
  // Also calculate the min dimensions required (this will be
  // the container dimentions)
  var containerStyles = window.getComputedStyle(container)
    , minW = parseInt( containerStyles.getPropertyValue('width') )
    , minH = parseInt( containerStyles.getPropertyValue('height') );
   
  // What's the min:intrinsic dimensions
  //
  // The idea is to get which of the container dimension
  // has a higher value when compared with the equivalents
  // of the video. Imagine a 1200x700 container and
  // 1000x500 video. Then in order to find the right balance
  // and do minimum scaling, we have to find the dimension
  // with higher ratio.
  //
  // Ex: 1200/1000 = 1.2 and 700/500 = 1.4 - So it is best to
  // scale 500 to 700 and then calculate what should be the
  // right width. If we scale 1000 to 1200 then the height
  // will become 600 proportionately.
  var widthRatio = minW / w
    , heightRatio = minH / h;
   
  // Whichever ratio is more, the scaling
  // has to be done over that dimension
  if (widthRatio > heightRatio) {
    var newWidth = minW;
    var newHeight = Math.ceil( newWidth / videoRatio );
  }
  else {
    var newHeight = minH;
    var newWidth = Math.ceil( newHeight * videoRatio );
  }
   
  video.style.width = newWidth + 'px';
  video.style.height = newHeight + 'px';
};
 
video.addEventListener('loadedmetadata', setVideoDimensions, false);
window.addEventListener('resize', setVideoDimensions, false);