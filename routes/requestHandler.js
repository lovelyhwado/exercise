var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function upload (res, req) {
	var form = new formidable.IncomingForm();
	form.parse(req, function (error, fields, files) {
		fs.renameSync(files.upload.path, ".");
	});
}

exports.upload = upload;