var gcm = require('node-gcm');

module.exports = function sendNotif(messageText, regIds) {
  var message = new gcm.Message();
  console.log("Hello");
  message.addData('message',messageText);
<<<<<<< HEAD
  console.log(message);
=======
  console.log(messageText);
>>>>>>> a8f5383d77118063429e70ed481c130f5189b108
  // var regIds = ['fV2UjeX-Hss:APA91bFadbsF_OfuoOgDEjMwAytPocrp9zoeYp8aFsUrMCp7Orl-gYwEkdeRmSkx6-uucnWROifcij9aUERvLTL4T840zAbDjymToLeCS6Ws5yytDeMpnVSyMgVwiCkU-99xF6Wvrjs2'];
  if(!(regIds instanceof Array))
    regIds=[regIds]
  var sender = new gcm.Sender('AIzaSyDSLwzK4C2Dqth55Z3SgXU77D7Xsex4VbI');

  sender.send(message, regIds, function (err, result) {
    if(err) console.error(err);
    else    console.log(result);
  });
};