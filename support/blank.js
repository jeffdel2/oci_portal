/* Client support JS goes here */

//const app = require('./app.js');
//import { app } from './app.js';

//var baseUrl = "https://okta-rocks-api.glitch.me/";
//var endpoint = "/api/private";
//var token = "1111";

//require('dotenv').config({ path: '.okta.env' })
//const { endpoint, baseUrl, token } = process.env;

var baseAPIUrl = "https://okta-rocks-api.glitch.me/";
var token = "1111";


console.log('Client-side code running');


function sampleFunction() {
  var test1 = "whatever";
  var test2 = "<%:test2%>";
  alert("Function call works");
  console.log("client side var is: ", test1);
  console.log("client side const is: ", test2);
  console.log("checking local def", baseAPIUrl);

}

/*
Implement API calls
*/

function callPublicAPI() {
  const request = axios.get(baseAPIUrl + "api/public")
  
  request
  .then(result => console.log('----- Inside result:', result.data))
  .catch(error => console.error('----- Inside error:', error.response.data))

  return request
  document.getElementById('request').innerHTML = request;
}

function callPrivateAPI() {
  const request = axios.get(baseURL + "api/private", {
  headers: {
    'Authorization': token
  }
})
  
  request
  .then(result => console.log('----- Inside result:', result.data))
  .catch(error => console.error('----- Inside error:', error.response.data))

  return request
  document.getElementById('request').innerHTML = request;
}







