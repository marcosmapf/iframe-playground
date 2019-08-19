var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('playground');
});

/* GET Iframe page. */
router.get('/iframe', function(req, res, next) {
  res.render('iframe');
});

module.exports = router;
