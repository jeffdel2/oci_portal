/* Client support JS goes here */

//var token = "1111";
//var amtoken = amtoken;
//var client_token = "<%:client_token%>";

const cookieValue = document.cookie
  .split('; ')
  .find((row) => row.startsWith('token='))
  ?.split('=')[1];

let value;
function getCookie(token) {
  const value = `; ${document.cookie}`;
  console.log("trying to get cookie value: ",value);
  //const parts = value.split(`; ${name}=`);
  //if (parts.length === 2) return parts.pop().split(';').shift();
}

var baseAPIUrl = "https://okta-rocks-api.glitch.me/"; // This is the base URL of the API Application

console.log("Client side token: ", cookieValue)
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
    'Authorization': document.cookie.token
  }
})
  
  request
  .then(result => document.getElementById('apiResult').innerHTML = JSON.stringify(result.data))
  .catch(error => document.getElementById('apiResult').innerHTML = JSON.stringify(error.response.data))
  
  console.log("Testing private call with cookie: ", document.cookie.AMTOKEN);
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

/*
Get cookie
*/

/*function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}*/

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}





