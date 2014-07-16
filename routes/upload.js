var express = require('express');
var router = express.Router();
var fs = require('fs');
var util = require('util');
var formidable = require('formidable');

router.get('/', function (req, res) {
	res.render('upload');
});

router.post('/files', function (req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function (error, fields, files) {
		var uploadpath = __dirname+"/../upload/"+files.file.name;
		console.log(uploadpath);
		fs.renameSync(files.file.path, uploadpath, function  (err) {
			throw err;
		});
		res.end(util.inspect(files));
	});
});

router.post('/hi', function (req, res) {
	console.log(req.body.greeting);
	res.render('upload');
});

module.exports = router;