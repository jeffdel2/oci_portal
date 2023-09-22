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

function getPhones() {
  var request = require('request');
  var options = {
  'method': 'GET',
  'url': 'https://acme.j5demo.com/idp/myaccount/phones',
  'headers': {
    'Accept': 'application/json; okta-version=1.0.0',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJraWQiOiJSOWtjNmpPM2Y1S082ZTlrWV9XZDRBaUZ6SGlyb3FsYURRNXg5QktZNjVNIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULldZN1oyVVlRSVJMdEhya0JkTjgxUC1QVnFDNTlNcGR4Z1FSYkRWZGhNMEUiLCJpc3MiOiJodHRwczovL2FjbWUuajVkZW1vLmNvbS9vYXV0aDIvYXVzNmFmazJoZnR0NlQweXI2OTciLCJhdWQiOiJhcGk6Ly9hY21lIiwiaWF0IjoxNjk1NDAxNzYwLCJleHAiOjE2OTU0MDUzNjAsImNpZCI6IjBvYTZhZmVyN2I1dFJnNUZ4Njk3IiwidWlkIjoiMDB1NTRvNWR2N0pNOENWekU2OTciLCJzY3AiOlsib2t0YS5teUFjY291bnQuZW1haWwucmVhZCIsIm9rdGEubXlBY2NvdW50LnBob25lLm1hbmFnZSIsInByb2ZpbGUiLCJva3RhLm15QWNjb3VudC5waG9uZS5yZWFkIiwib3BlbmlkIiwicGhvbmUiXSwiYXV0aF90aW1lIjoxNjk1NDAxMDQ1LCJhY21lLkdyb3VwcyI6WyJBY21lQWNjZXNzR3JvdXAiXSwic3ViIjoiand0QGF0a28uZW1haWwifQ.hzlxB_iexkMTJFLDbZMD86VZmBpyFCq2FffCQhElzkwIVJva8CS_wS4B0qvTTcE_ltozEWEB4k9hTshn04vpdBou6kwUtizw21OQJCeNMnLvbv6P3FiAon90qHiFwP0Cl6X_ITwOsfHr7MW2a_c-OOddOj-1byRioL3vTjPhgm7i4q9HW-E0x7EEDLbtWS8kddA0CezrO7-Mi_3zdhUtg3P5xLdTALYtMaahVuporvUskR5n6s3GssX867owJFeQNXmMrNNVLnns-M73NLWWCOwtWICC_KyH6eKM6zwwv-zqPdocutIdPJCPaHlN-kzQa8gQyrX3qh6hh_ZIBGiEsg',
  },
  body: JSON.stringify({})

  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
}


function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}





