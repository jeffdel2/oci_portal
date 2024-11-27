var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var qs = require('querystring');
var { Strategy } = require('passport-openidconnect');
const axios = require('axios');
var jwt_decode = require('jwt-decode');
var request = require('request');

// Source and import environment variables
//require('dotenv').config({ path: '.okta.env' })
require('dotenv').config({ path: '.env' })
const { ORG_URL, WELL_KNOWN_ENDPOINT, CLIENT_ID, CLIENT_SECRET, TOKEN_VALUE, WF_INVOKE } = process.env;

var indexRouter = require('./routes/index');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'CanYouLookTheOtherWay',
  resave: false,
  saveUninitialized: true
}));

// Setup static file share as well as client side JS
app.use(express.static('public'));
app.use('/support', express.static(path.resolve(__dirname + '/support')));
app.use('/public', express.static(path.resolve(__dirname + '/public')));


// Setup Okta authentication
app.use(passport.initialize());
app.use(passport.session());

// https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfigurationRequest //
let logout_url, id_token, am_token, decoded_am_token, decoded_id_token, decoded_am_token2, groups, group;
let _base = WELL_KNOWN_ENDPOINT.slice(-1) == '/' ? WELL_KNOWN_ENDPOINT.slice(0, -1) : WELL_KNOWN_ENDPOINT;
axios
  .get(`${_base}`)
  .then(res => {
    if (res.status == 200) {
      let { issuer, authorization_endpoint, token_endpoint, userinfo_endpoint, end_session_endpoint } = res.data;
      logout_url = end_session_endpoint;
      // Set up passport
      // console.log(res.data);
      passport.use('oidc', new Strategy({
        issuer,
        authorizationURL: authorization_endpoint,
        tokenURL: token_endpoint,
        userInfoURL: userinfo_endpoint,
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: 'https://nissan-partners.glitch.me/authorization-code/callback',
        scope: 'profile offline_access phone groups',
        //scope: 'profile offline_access phone okta.myAccount.phone.read okta.myAccount.phone.manage okta.myAccount.email.read',
      }, (issuer, profile, context, idToken, accessToken, refreshToken, params, done) => {
        console.log(`OIDC response: ${JSON.stringify({
          issuer, profile, context, idToken,
          accessToken, refreshToken, params
        }, null, 2)}\n*****`);
        id_token = idToken;
        am_token = accessToken;
        decoded_am_token = JSON.stringify(jwt_decode(am_token), null, 4);
        decoded_id_token = JSON.stringify(jwt_decode(id_token), null, 4);
        group = JSON.parse(decoded_id_token);
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


//
// Add endpoints


app.use('/', indexRouter);

app.use('/login', passport.authenticate('oidc'));

app.use('/authorization-code/callback',
  passport.authenticate('oidc', { failureMessage: true, failWithError: true }),
  (req, res) => {
    res.redirect('/portal');
  }
);
//testing

// Add page to review basic profile data and JWT tokens
app.use('/profile', ensureLoggedIn, (req, res) => {
  res.render('profile', { authenticated: req.isAuthenticated(), user: req.user, idtoken: decoded_id_token, amtoken: decoded_am_token });
  //console.log("GROUPS",groups);
});

// Add endpoint for end user registration
app.use('/register', (req, res) => {
  res.render('register');
});

// Add endpoint to test api calls
app.use('/apis', ensureLoggedIn, (req, res) => {
  res.cookie('token', am_token);
  res.render('apis', { authenticated: req.isAuthenticated(), user: req.user, idtoken: id_token, amtoken: am_token });
});

// Add submit endpoint for self reg
app.post('/submit', (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const reg_url = "https://nissan-partners.glitch.me/";
  
  var options = {
  'method': 'POST',
  'url': ORG_URL+'/api/v1/users?activate=false',
  'headers': {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'SSWS '+TOKEN_VALUE
  },
  body: JSON.stringify({
    "profile": {
      "firstName": firstname,
      "lastName": lastname,
      "email": email,
      "login": email
    },
  "groupIds": [
    "00g7qpj0v7Nlu0fjC697"
  ]
  })

}
  request(options, function (error, response) {
  if (error) throw new Error(error);
    else (
    console.log("SUCCESS"));
    res.redirect(reg_url);
  })
});

// Add endpoint for end user registration
app.use('/forgotusername', (req, res) => {
  res.render('forgotuser');
});

///////
//////

app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    const obj = JSON.parse(decoded_id_token);
    const groups = obj.groups;
    req.isAdmin = groups.some(group => group.includes('Admin'));
    req.isUser = groups.some(group => group.includes('User'));
  } else {
    req.isAdmin = false;
    req.isUser = false;
  }
  next();
});

// Portal Page
app.use('/portal', ensureLoggedIn, (req, res) => {
  res.render('portal', { authenticated: req.isAuthenticated(), user: req.user, isAdmin: req.isAdmin, isUser: req.isUser, });
  console.log("ON PAGE", req.isUser)
});

// Admin Panel Page
app.use('/admin-panel',ensureLoggedIn , (req, res) => {
  res.render('admin-panel', { authenticated: req.isAuthenticated(), user: req.user, isAdmin: req.isAdmin, isUser: req.isUser, });
});



// Add forgot endpoint for self reg
app.post('/forgot', (req, res) => {
  console.log("TOUCHDOWN");
  const email = req.body.email;
  const forgot_url = "https://nissan-partners.glitch.me/forgotusername";
  
  var options = {
  'method': 'POST',
  'url': WF_INVOKE,
  'headers': {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  body: JSON.stringify({
      "email": email,
  })
}}
  request(options, function (error, response) {
  console.log("REQUEST",request);
  if (error) throw new Error(error);
    else (
    console.log("SUCCESS",response));
    res.redirect(forgot_url);
  })
});

// Add endpoint for end user registration
app.use('/factors', ensureLoggedIn, (req, res) => {
  res.cookie('token', am_token);
  res.render('factors', { authenticated: req.isAuthenticated(), user: req.user, amtoken: am_token });
});

// Add submit endpoint for factors api
app.post('/getfactors', (req, res) => {
  var request = require('request');
  var options = {
  'method': 'GET',
  'url': ORG_URL+'/api/v1/users/00u54o5dv7JM8CVzE697/factors',
  'headers': {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'SSWS '+TOKEN_VALUE,
  }
}
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log("FACTORS",response.body);
  })
});


// Add logout endpoint
app.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) { return next(err); }
    let params = {
      id_token_hint: id_token,
      post_logout_redirect_uri: 'https://nissan-partners.glitch.me/'
    }
    res.redirect(logout_url + '?' + qs.stringify(params));
  });
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
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
