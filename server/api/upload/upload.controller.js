'use strict';

var _ = require('lodash');
var multiparty = require('multiparty');
var fs  = require('fs');
var path = require('path');
var mime = require('mime');

//Serves the given filepath from /server/api/uploads/storage

exports.serve = function(req, res) {
  // var options = {
  //   root: __dirname + '/static/',
  //   dotfiles: 'deny',
  //   headers: {
  //       'x-timestamp': Date.now(),
  //       'x-sent': true
  //   }
  // };

  var fileName = __dirname + '/static/' + req.params.name;
  console.log(fileName);
  res.sendFile(fileName);

  // var mypath = req.params[0] ? req.params[0] : 'index.html';
  // console.log(__dirname);
 
  // var file = __dirname + '/static/' + mypath;

  // res.download(file, function(err){
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("success");
  //   }
  // });
  
  // console.log(file);
  // var filename = path.basename(file);
  // var mimetype = mime.lookup(file);
  // console.log(filename, mimetype);

  // res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  // res.setHeader('Content-type', mimetype);

  // var filestream = fs.createReadStream(file);
  // filestream.pipe(res);
};

// Creates a new upload in the DB. 
// Will upload to a temp folder, need to move the file away later.
// Use UUID and fs to rename and relocate the folder accordingly

exports.create = function(req, res) {
  var form = new multiparty.Form(
    {uploadDir: __dirname + '/static'}
  );

  form.parse(req, function(err, fields, files) {
    console.log(fields);
    res.json(200, files);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}