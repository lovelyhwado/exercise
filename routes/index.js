var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { message: '아직 안만들었음' });
});
router.get('/board', function (req, res) {
	res.render('index', {message : '여기도 안만듬'});
});
router.get('/upload', function (req, res) {
	res.render('upload');
});
module.exports = router;