/* This 
  is used
  for sending mails
*/
var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport')

'use strict';
module.exports = function sendEmail(sub, text, emailTo, messageId, initial) {
  var transporter = nodemailer.createTransport(directTransport());
      if(!(initial)){
      	var mailOptions = {
        to: emailTo,
        from: 'erp@saarang.org',
        subject: sub,
        text: text,
        messageId: messageId+'-erp-saarang@saarang.org',
      };
      }
      if(initial){
      	var mailOptions = {
        to: emailTo,
        from: 'erp@saarang.com',
        subject: sub,
        text: text,
        messageId: messageId+'-erp-saarang@saarang.org',
        inReplyTo: messageId+'-erp-saarang@saarang.org'
      };
      }
      transporter.sendMail(mailOptions, function (err, info) {
        
      });   
};
