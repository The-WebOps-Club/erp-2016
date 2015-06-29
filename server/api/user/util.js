var crypto = require('crypto');
var nodemailer = require('nodemailer');

var generateToken = function(callback) {
	crypto.randomBytes(25, function (err, buf) {
		var token = buf.toString('hex');
		callback(err, token);
	});
}

var sendMail = function(auth_credentials, mailOptions, callback) {
	var transporter = nodemailer.createTransport(auth_credentials);
	transporter.sendMail(mailOptions, callback);
}

module.exports.mailer_util = { generateToken : generateToken , sendMail : sendMail};