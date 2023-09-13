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
var baseOktaUrl = "https://jsd.okta.com/"; // This is the base URL of the Okta tenant


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


function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function callRegAPI() {
  
  const request = axios.post(baseOktaUrl + "api/v1/users?activate=false", {
  headers: {
    'Authorization': 'SSWS'+tokenValue
  }
})
  
  request
  .then(result => document.getElementById('apiResult').innerHTML = JSON.stringify(result.data, null, 4))
  .catch(error => document.getElementById('apiResult').innerHTML = JSON.stringify(error.response.data, null, 4))
  
  return request
}





