var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { authenticated: req.isAuthenticated() });
});

router.get('/static', function(req, res, next) {
  res.render('blank');
});


module.exports = router;


