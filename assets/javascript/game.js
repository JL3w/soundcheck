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