/* Client support JS goes here */

var token = "1111";
var client_token = "<%:client_token%>";

var baseAPIUrl = "https://okta-rocks-api.glitch.me/"; // This is the base URL of the API Application

console.log("Client side token: ", client_token)
//var token = $(am_token);


console.log('Client-side code');

/*
Implement API calls
*/

function callPublicAPI() {
  //const apiResponse = ""
  const request =  axios.get(baseAPIUrl + "api/public")
  
  request
  .then(result => document.getElementById('apiResult').innerHTML = JSON.stringify(result.data))
  .catch(error => document.getElementById('apiResult').innerHTML = JSON.stringify(error.response.data))

  return request
}

function callPrivateAPI() {
  const request = axios.get(baseAPIUrl + "api/private", {
  headers: {
    'Authorization': token
  }
})
  
  request
  .then(result => document.getElementById('apiResult').innerHTML = JSON.stringify(result.data))
  .catch(error => document.getElementById('apiResult').innerHTML = JSON.stringify(error.response.data))
  
  return request
}

function callAccessAPI() {
  const request = axios.get(baseAPIUrl + "api/access", {
  headers: {
    'Authorization': token
  }
})
  
  request
  .then(result => document.getElementById('apiResult').innerHTML = JSON.stringify(result.data))
  .catch(error => document.getElementById('apiResult').innerHTML = JSON.stringify(error.response.data))

  return request
}







