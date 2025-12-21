var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET coming soon page. */
router.get('/temp/coming', function(req, res, next) {
  res.render('temp/coming');
});

module.exports = router;
