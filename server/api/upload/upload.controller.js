'use strict';

var _ = require('lodash'),
  mongoose = require('mongoose'),
  Grid = require('gridfs-stream'),
  mime = require('mime');

Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);

exports.create = function (req, res) {
  console.log(req);
  var part = req.files.file;
  // mime.define({
  //   'application/x-zip': ['zip'],
  // });
  // console.log(mime.lookup(part.name));
  // part.mimetype = mime.lookup(part.name);
  // console.log(part);
  var writeStream = gfs.createWriteStream({
    filename: part.name,
    mode: 'w',
    content_type:part.mimetype
  });


  writeStream.on('close', function() {
    return res.status(200).send({
      message: 'Success'
    });
  });
  
  writeStream.write(part.data);

  writeStream.end();
}

exports.serve = function(req, res) {
 
  gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
 
      if(files.length===0){
      return res.status(400).send({
        message: 'File not found'
      });
      }
  
    res.writeHead(200, {'Content-Type': files[0].contentType});
    
    var readstream = gfs.createReadStream({
        filename: files[0].filename
    });
 
      readstream.on('data', function(data) {
          res.write(data);
      });
      
      readstream.on('end', function() {
          res.end();        
      });
 
    readstream.on('error', function (err) {
      console.log('An error occurred!', err);
      throw err;
    });
  });
 
};

// exports.create = function(req, res) {
//   var form = new multiparty.Form(
//     {uploadDir: __dirname + '/static'}
//   );

//   form.parse(req, function(err, fields, files) {
//     console.log(fields);
//     console.log(files);
//     console.log(err);
//     res.json(200, files);
//   });
// };

function handleError(res, err) {
  return res.send(500, err);
}