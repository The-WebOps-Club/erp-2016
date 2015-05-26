/* This 
  is used
  for sending mails
*/
var nodemailer = require('nodemailer');


'use strict';
module.exports = function sendEmail(sub, text, emailTo, messageId, initial ) {
 var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: EMAIL,
          pass: PASSWORD
        }
      });
      if(!(initial)){
      	var mailOptions = {
        to: emailTo,
        from: EMAIL,
        subject: sub,
        text: text,
        messageId: messageId+'-erp-saarang.saarang.org'
      };
      }
      if(initial){
      	var mailOptions = {
        to: emailTo,
        from: EMAIL,
        subject: sub,
        text: text,
        messageId: messageId+'-erp-saarang.saarang.org',
        inReplyTo: messageId+'-erp-saarang.saarang.org'
      };
      }
      smtpTransport.sendMail(mailOptions, function (err, info) {
        if(err) {
          console.log('Error Occurred');
          console.log(err);
          return res.sendStatus(500);
        } else {
          console.log(info);
          res.sendStatus(200);
        }
      });   
};
