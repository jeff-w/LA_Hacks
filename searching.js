/*jslint white: true */         //declare global vars in a comment..
/*global $, prettyPrint, OAuth*/

/*LOTS of complaints about indentation and spacing wtf...*/


var latitude;
var longitude;

function displayLocation(position) {
    "use strict";
    //build text string including co-ordinate data passed in parameter
    //var displayText = "User latitude is " + position.coords.latitude + " and longitude is " + position.coords.longitude;
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    //display the string for demonstration
    //document.getElementById("locationData").innerHTML = "lat is " + latitude + ", long is " + longitude;
     window.console.log(latitude + " " + longitude);
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



function doSearch(){
    "use strict";
    var auth, accessor, parameters, params, act, message, parameterMap;
    auth = { 
      //
      // Update with your auth tokens
      //
      consumerKey: "5a1VTjzrmxoL0XqV-Oix-Q", 
      consumerSecret: "JnV9pT9i2jbtsXSvOHGAin26g5w",
      accessToken: "7NnijiyMMc1X2nDOB673XVYTcUTzfvPi",
      // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
      // You wouldn't actually want to expose your access token secret like this in a real application.
      accessTokenSecret: "ysz8RUYz8iPZLlOkg_rsEqN1wjY",
      serviceProvider: {
        signatureMethod: "HMAC-SHA1"
      }
    };

    accessor = {
      consumerSecret: auth.consumerSecret,
      tokenSecret: auth.accessTokenSecret
    };

    parameters = [];
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

    //params = parent.document.URL.substring(parent.document.URL.indexOf('?') + 7, parent.document.URL.length); //data past the =
    act = "http://api.yelp.com/v2/search?term=food&ll=34.0716,-118.4504";

    //window.alert(act);

    message = { 
      'action': act,
      'method': 'GET',
      'parameters': parameters 
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    parameterMap = OAuth.getParameterMap(message.parameters);
    parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);
    window.console.log(parameterMap);

    $.ajax({
      'url': message.action,
      'data': parameterMap,
      'cache': true,
      'dataType': 'jsonp',
      'jsonpCallback': 'cb',
      'success': function(data, textStats, XMLHttpRequest) {
        var out = (data.businesses[0].name), output = prettyPrint(data);
          $("body").append(out);
        window.console.log(data);
        $("body").append(output);
      }
    });

}