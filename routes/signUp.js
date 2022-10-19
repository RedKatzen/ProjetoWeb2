var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/signUp', function(req, res, next) {
  res.render('signUp', { title: 'Sign Up'});
});

module.exports = router;