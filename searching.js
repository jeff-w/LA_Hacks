/*jslint white: true */
/*global $, prettyPrint */

var auth = { 
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

var accessor = {
  consumerSecret: auth.consumerSecret,
  tokenSecret: auth.accessTokenSecret
};

var parameters = [];
parameters.push(['callback', 'cb']);
parameters.push(['oauth_consumer_key', auth.consumerKey]);
parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
parameters.push(['oauth_token', auth.accessToken]);
parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

var message = { 
  'action': 'http://api.yelp.com/v2/search?term=food&ll=37.788022,-122.399797',
  'method': 'GET',
  'parameters': parameters 
};

var OAuth;
OAuth.setTimestampAndNonce(message);
OAuth.SignatureMethod.sign(message, accessor);

var parameterMap = OAuth.getParameterMap(message.parameters);
parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);
window.console.log(parameterMap);

$.ajax({
  'url': message.action,
  'data': parameterMap,
  'cache': true,
  'dataType': 'jsonp',
  'jsonpCallback': 'cb',
  'success': function(data, textStats, XMLHttpRequest) {
      "use strict";
    var out = (data.businesses[0].name), output = prettyPrint(data);
      $("body").append(out);
    window.console.log(data);
    $("body").append(output);
  }
});