/*global $ */                   //declare global vars in a comment..
/*jslint white: true */

var latitude;
var longitude;

/*LOTS of complaints about indentation and spacing wtf...*/


function displayLocation(position) {
    "use strict";
    //build text string including co-ordinate data passed in parameter
    //var displayText = "User latitude is " + position.coords.latitude + " and longitude is " + position.coords.longitude;
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    //display the string for demonstration
    //document.getElementById("locationData").innerHTML = "lat is " + latitude + ", long is " + longitude;
}


function displayError(error) {
    "use strict";
    //get a reference to the HTML element for writing result
    //var locationElement = document.getElementById("locationData");

    //find out which error we have, output message accordingly
    switch (error.code) {
    case error.PERMISSION_DENIED:
        window.alert("Permission was denied");
        break;
    case error.POSITION_UNAVAILABLE:
        window.alert("Location data not available");
        break;
    case error.TIMEOUT:
        window.alert("Location request timeout");
        break;
    case error.UNKNOWN_ERROR:
        window.alert("An unspecified error occurred");
        break;
    default:
        window.alert("Who knows what happened...");
        break;
    }
}


function getUserLocation() {
    "use strict";   //dumb complaint

    window.console.log("enter getUserLocation() function");
    
    //check if the geolocation object is supported, if so get position
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        window.alert("Sorry - your browser doesn't support geolocation!");
    }
}



$(document).ready(function(){
    "use strict";
    
});