/* All support JS goes here */

console.log("is it loading1");
/*
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var qs = require('querystring');
const axios = require('axios');
var jwt_decode = require('jwt-decode');
*/
console.log("is it loading2");

// source and import environment variables
//require('dotenv').config({ path: path.resolve(__dirname, '../.okta.env' )})
//require('dotenv').config({ path: require('find-config')('.okta.env') })

//const { baseUrl, am_token } = process.env;
//console.log(require("dotenv").config());

/*
function callPrivateAPI() {
  const request = axios.get(baseUrl + "api/private", {
  headers: {
    'Authorization': am_token
  }
})
  
  request
  .then(result => console.log('----- Inside result:', result.data))
  .catch(error => console.error('----- Inside error:', error.response.data))

  return request
  document.getElementById('request').innerHTML = request;
}
  
function callPublicAPI() {
  const request = axios.get(baseUrl + "api/public")
  
  request
  .then(result => console.log('----- Inside result:', result.data))
  .catch(error => console.error('----- Inside error:', error.response.data))

  return request
  document.getElementById('request').innerHTML = request;
}

*/
console.log('Client-side code running');

/*
const button = document.getElementById('publicButton');
button.addEventListener('click', function(e) {
  console.log('button was clicked');
});
*/

function sampleFunction() {

alert("This function is working!");

}

$('#publicButton').click(function(){
    console.log('button clicked');
    $.ajax({url: 'publicButtonURL', success:function(res){
        console.log('server response is', res);
    }});
});


