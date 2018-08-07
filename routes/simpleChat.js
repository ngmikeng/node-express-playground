var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pages/simpleChat', { title: 'MSG' });
});

module.exports = router;