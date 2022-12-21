/* Client support JS goes here */

var token = "eyJraWQiOiI3Y3N6LUpqN2pDVXh6MjctN3QxVWJaWTY3T2g1aVlmSlBaZjVKYTBWR05RIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULmtSQ1QxVTBkdkFwY1dLU0VKMXVBVjAwTi1zRG1PWUJnbmxDLWJIS1RoV3MiLCJpc3MiOiJodHRwczovL2RlbG9uZ29pZS5va3RhcHJldmlldy5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNjcxNjU1NzMyLCJleHAiOjE2NzE2NTkzMzIsImNpZCI6IjBvYTV4d3ZkcDB3Rmg2ZU81MWQ3IiwidWlkIjoiMDB1Mml3bmp3cVAyREhOYlMxZDciLCJzY3AiOlsib3BlbmlkIiwicHJvZmlsZSIsImdyb3VwcyIsInBob25lIl0sImF1dGhfdGltZSI6MTY3MTYzMTAyMywic3ViIjoiand0QGF0a28uZW1haWwifQ.bemgbTZpv2lZi9JHC73S8tBSsT4x31ithwUAG2pgrv8Xi0ZZN--fgNnepoZGRIMROrLl_VtOPf1bO3wuC3X673jGGKVIU2F1-huQzU6KEJPq3Ck9ana4rwDUBWq4QNQ-8tVDWztVr4nK_lWAjq5sPfkTRqmmQOfMApysKZHMH97M3jW5Kw772a-GkL9x4jaOGljcLd1VHVwg9-2RSf6UMKPVpdOX7twhudPgjaOqgIX2RmU32P0wGYiIHRiIJZm_usKn2gJRGgcj-JGueW4F3ZWqfudatHGMMsxKjBS9p1LpLWGqBbmFFbf5dLq0r8p0BfDs1yytRTdz5KjKHdMXSg";

var baseAPIUrl = "https://okta-rocks-api.glitch.me/"; // This is the base URL of the API Application

console.log("Client side token: ", token)
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







