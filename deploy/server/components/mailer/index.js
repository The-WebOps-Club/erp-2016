/* This 
  is used
  for sending mails
*/
var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');

'use strict';
exports.sendEmail = function(sub, text, emailTo, messageId, initial) {
var transporter = nodemailer.createTransport(directTransport());
      if(!(initial)){
      	var mailOptions = {
        to: emailTo,
        from: 'erp@saarang.org',
        subject: sub,
        //text: text,
        html: text,
        generateTextFromHTML: true,
        messageId: messageId+'-erp-saarang@saarang.org',
      };
      }
      if(initial){
      	var mailOptions = {
        to: emailTo,
        from: 'erp@saarang.org',
        subject: sub,
        html: text,
        generateTextFromHTML: true,
        messageId: messageId+'-erp-saarang@saarang.org',
        inReplyTo: messageId+'-erp-saarang@saarang.org'
      };
      }
      transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);

}); 
};






// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols


// send mail with defined transport object
