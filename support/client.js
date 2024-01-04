/* Client support JS goes here */

/*
Get cookie
*/
const cookieValue = document.cookie
  .split('; ')
  .find((row) => row.startsWith('token='))
  ?.split('=')[1];


/*
Set API base URL
*/
var baseAPIUrl = "https://acme-api.glitch.me/"; // This is the base URL of the API Application
var baseOrgUrl = "https://acme.j5demo.com/";


/*
Implement API calls
*/

function callPublicAPI() {
  
  const request =  axios.get(baseAPIUrl + "api/public")
  
  request
  .then(result => document.getElementById('apiResult').innerHTML = JSON.stringify(result.data, null, 4))
  .catch(error => document.getElementById('apiResult').innerHTML = JSON.stringify(error.response.data, null, 4))

  return request
}

function callPrivateAPI() {
  
  const request = axios.get(baseAPIUrl + "api/private", {
  headers: {
    'Authorization': cookieValue
  }
})
  
  request
  .then(result => document.getElementById('apiResult').innerHTML = JSON.stringify(result.data, null, 4))
  .catch(error => document.getElementById('apiResult').innerHTML = JSON.stringify(error.response.data, null, 4))
  
  return request
}

function callAccessGroupsAPI() {
  
  const request = axios.get(baseAPIUrl + "api/groups", {
  headers: {
    'Authorization': cookieValue
  }
})
  
  request
  .then(result => document.getElementById('apiResult').innerHTML = JSON.stringify(result.data, null, 4))
  .catch(error => document.getElementById('apiResult').innerHTML = JSON.stringify(error.response.data, null, 4))
  
  return request
}

function callAccessAPI() {
  
  const request = axios.get(baseAPIUrl + "api/access", {
  headers: {
    'Authorization': cookieValue
  }
})
  
  request
  .then(result => document.getElementById('apiResult').innerHTML = JSON.stringify(result.data, null, 4))
  .catch(error => document.getElementById('apiResult').innerHTML = JSON.stringify(error.response.data, null, 4))

  return request
}

function callgetPhones() {
  
  console.log("INSIDE COOKIE",cookieValue);
  const request = axios.get(baseOrgUrl + "idp/myaccount/phones", {
  headers: {
    'Accept': 'application/json; okta-version=1.0.0',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+cookieValue
  }
})
  
  request
  .then(result => document.getElementById('myAccountResult').innerHTML = JSON.stringify(result.data, null, 4))
  .catch(error => document.getElementById('myAccountResult').innerHTML = JSON.stringify(error.response.data, null, 4))
  
  
  return request
}


function getPhones() {
  var request = require('request');
  var options = {
  'method': 'GET',
  'url': 'https://acme.j5demo.com/idp/myaccount/phones',
  'headers': {
    'Accept': 'application/json; okta-version=1.0.0',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+cookieValue,
  },
  body: JSON.stringify({})
    
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log("INSIDE RESPONSE",response.body);
  });
}


function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}





