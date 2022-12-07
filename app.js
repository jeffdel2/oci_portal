var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var qs = require('querystring');
var { Strategy } = require('passport-openidconnect');
const axios = require('axios');
var jwt_decode = require('jwt-decode');

// source and import environment variables
require('dotenv').config({ path: '.okta.env' })
const { ORG_URL, CLIENT_ID, CLIENT_SECRET, baseUrl } = process.env;


var indexRouter = require('./routes/index');

// var scriptHost = require('./script.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'CanYouLookTheOtherWay',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfigurationRequest
let logout_url, id_token, am_token, decoded_am_token, decoded_id_token, decoded_am_token2;
let _base = ORG_URL.slice(-1) == '/' ? ORG_URL.slice(0, -1) : ORG_URL;
axios
  .get(`${_base}/oauth2/default/.well-known/oauth-authorization-server`)
  .then(res => {
    if (res.status == 200) {
      let { issuer, authorization_endpoint, token_endpoint, userinfo_endpoint, end_session_endpoint } = res.data;
      logout_url = end_session_endpoint;

      // Set up passport
      passport.use('oidc', new Strategy({
        issuer,
        authorizationURL: authorization_endpoint,
        tokenURL: token_endpoint,
        userInfoURL: userinfo_endpoint,
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: 'https://okta-rocks-ui.glitch.me/authorization-code/callback',
        scope: 'groups profile offline_access phone',
      }, (issuer, profile, context, idToken, accessToken, refreshToken, params, done) => {
        console.log(`OIDC response: ${JSON.stringify({
          issuer, profile, context, idToken,
          accessToken, refreshToken, params
        }, null, 2)}\n*****`);
        id_token = idToken;
        am_token = accessToken;
        //baseUrl = baseUrl;
        decoded_am_token = JSON.stringify(jwt_decode(am_token), null, 4);
        decoded_id_token = JSON.stringify(jwt_decode(id_token), null, 4);
        return done(null, profile);
      }));
    }
    else {
      console.log(`Unable to reach the well-known endpoint. Are you sure that the ORG_URL you provided (${ORG_URL}) is correct?`);
    }
  })
  .catch(error => {
    console.error(error);
  });


passport.serializeUser((user, next) => {
  next(null, user);
});

passport.deserializeUser((obj, next) => {
  next(null, obj);
});

function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login')
}

/////
// Testing calls to apis
/////

function handlePublicAPICall(baseUrl, signIn) {
  console.log("handlePublicAPICall()");
  document.getElementById("apiResultsDisplay").innerHTML = "";
  getJson(baseUrl + '/api/public', signIn, function(json){
    document.getElementById("apiResultsDisplay").innerHTML = JSON.stringify(JSON.parse(json), null, 4);
  });
}







////
//fetch access token from client
////




app.use('/', indexRouter);

app.use('/login', passport.authenticate('oidc'));

app.use('/authorization-code/callback',
  // https://github.com/jaredhanson/passport/issues/458
  passport.authenticate('oidc', { failureMessage: true, failWithError: true }),
  (req, res) => {
    res.redirect('/profile');
  }
);

//Add page to review basic profile data and JWT tokens
app.use('/profile', ensureLoggedIn, (req, res) => {
  res.render('profile', { authenticated: req.isAuthenticated(), user: req.user, idtoken: decoded_id_token, amtoken: decoded_am_token });
});

/////
// Add page to test api endpoints
app.use('/apis', ensureLoggedIn, (req, res) => {
  res.render('apis', { authenticated: req.isAuthenticated(), user: req.user, idtoken: id_token, amtoken: am_token, baseUrl: baseUrl });
  console.log(baseUrl);
  //console.log(publicApiCall);
});

/////
// Add page to test api endpoints new methods
app.use('/newapis', ensureLoggedIn, (req, res) => {
  res.render('newapis', { authenticated: req.isAuthenticated(), user: req.user, idtoken: id_token, amtoken: am_token, baseUrl: baseUrl, handlePublicAPICall: handlePublicAPICall });
  console.log(baseUrl);
  //console.log(publicApiCall);
});


app.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) { return next(err); }
    let params = {
      id_token_hint: id_token,
      post_logout_redirect_uri: 'https://okta-rocks-ui.glitch.me/'
    }
    res.redirect(logout_url + '?' + qs.stringify(params));
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message + (err.code && ' (' + err.code + ')' || '') +
    (req.session.messages && ": " + req.session.messages.join("\n. ") || '');
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/* Protect all of the API Calls */
function handlePublicAPICall(api_url, signIn) {
  console.log("handlePublicAPICall()");
  document.getElementById("apiResultsDisplay").innerHTML = "";
  getJson(api_url + '/api/public', signIn, function(json){
    document.getElementById("apiResultsDisplay").innerHTML = JSON.stringify(JSON.parse(json), null, 4);
  });
}

/* js utils */
function getJson(url, signIn, callback) {
  console.log("getJson('" + url+ "')");
  document.getElementById("apiResultsDisplay").innerHTML = "";
  
  const httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url);
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4) {
      console.log(httpRequest.responseText);
      callback(httpRequest.responseText);
    }
  }
  httpRequest.setRequestHeader("Access-Control-Allow-Origin","*");
  httpRequest.responseType="text";
  
  signIn.authClient.tokenManager.get("accessToken")
      .then(function(token) {
          console.log("Got access Token!");
          console.log(token);
          
          httpRequest.setRequestHeader("Authorization","Bearer " + token.value);
          httpRequest.send();

      })
      .catch(function(err) {
        console.log("Unable to retrieve accessToken from local storage");
      });
  
}

/* sign in helpers */

function checkAndShowIdToken(signIn) {
  console.log("checkAndShowIdToken()");

  signIn.authClient.tokenManager.get("idToken")
      .then(function(token) {
        console.log("Got id Token!");
          // Token is valid
          signIn.authClient.token.verify(token)
            .then(function() {
              // the idToken is valid
              console.log("Token is Valid!");
              console.log(token);
              document.getElementById("idTokenDisplay").innerHTML = JSON.stringify(jwt_decode(token.value), null, 4);
              showAccessToken(signIn);
              showLoggedInStuff(signIn);
              document.getElementById("showIdTokenTabBtn").click();
            })
            .catch(function(err) {
              console.log("Token is not valid!");
              showNotLoggedInStuff(signIn);
            });
      })
      .catch(function(err) {
        console.log("Unable to retrieve idToken from local storage");
        showNotLoggedInStuff(signIn);
      });
}

function showAccessToken(signIn) {
  console.log("showAccessToken()");

  signIn.authClient.tokenManager.get("accessToken")
      .then(function(token) {
          console.log("Got access Token!");
          console.log(token);
          document.getElementById("accessTokenDisplay").innerHTML = JSON.stringify(jwt_decode(token.value), null, 4); 

      })
      .catch(function(err) {
        console.log("Unable to retrieve accessToken from local storage");
      });
}

function showNotLoggedInStuff(signIn) {
  console.log("showNotLoggedInStuff()");
  //Show login stuff
  signIn.show();
  document.getElementById("signin-header").style.display = "block";
  //Hide post login stuff
  document.getElementById("okta-post-login-container").style.display = "none";
}

function showLoggedInStuff(signIn) {
  console.log("showLoggedInStuff()");
  //Hide login stuff
  signIn.hide();
  document.getElementById("signin-header").style.display = "none";
  //Show post login stuff
  document.getElementById("okta-post-login-container").style.display = "block";
}

function signOut(signIn) {
  console.log("signOut()");
  signIn.authClient.signOut({
    postLogoutRedirectUri: window.location.origin
  });
}
