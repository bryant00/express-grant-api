var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // console.log(process.env.NODE_ENV);
  res.render('index', { title: 'Home Page' });
});

module.exports = router;
