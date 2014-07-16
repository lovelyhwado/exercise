var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var isDuplicatedEmail = 0;
/* GET home page. */
router.get('/', function (req, res) {
	req.session.touch();
  res.render('index', { message: 'Hello, '+req.session.name+' !', login : req.session.login });
});

router.post('/login', function (req, res) {
	var shasum = crypto.createHash('sha1');
	shasum.update(req.body.password);

	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({email:req.body.email, password:shasum.digest('hex')}, function (err, doc) {
		if (doc.length === 0) {
			res.end('fail');
		} else {
			req.session.login = 1;
			console.log(doc[0].name);
			req.session.name = doc[0].name;
			res.end('success');
		}
	});
});

router.post('/logout', function (req, res) {
	req.session.destroy();
	res.end();
});

router.get('/board', function (req, res) {
	res.render('index', {message : '여기도 안만듬'});
});

router.get('/signup', function (req, res) {
	res.render('signup');
});

router.post('/signup/add', function (req, res) {
	if (isDuplicatedEmail === 1) {
		res.end("dont");
	} else {
		var shasum = crypto.createHash('sha1');
		shasum.update(req.body.password);

		var db = req.db;
		var collection = db.get('usercollection');
		collection.insert({
			"name" : req.body.name,
			"email" : req.body.email,
			"password" : shasum.digest('hex')
		}, function (err, doc) {
			if (err) {
				console.log(err);
			}
		});
	}
});

router.post('/signup/checkmail', function (req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({email:req.body.email}, function (err, doc) {
		if (doc.length === 0) {
			isDuplicatedEmail = 0;
			res.end("not duplicated");
		} else {
			isDuplicatedEmail = 1;
			res.end("duplicated");
		}
	});
});

module.exports = router;