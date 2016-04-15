'use strict';

var _ = require('lodash'),
  mongoose = require('mongoose'),
  Grid = require('gridfs-stream'),
  mime = require('mime');

Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);
var fs = require('fs');
var path=require('path');
var multer = require('multer');


var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ //multer settings
  storage: storage
}).single('file');

exports.uploadFunction = function (req, res) {
  console.log(__dirname + '/uploads');
  console.log(req.files);
  upload(req,res,function(err){
    if(err){
      res.json({error_code:1,err_desc:err});
      return;
    }
    res.json({error_code:0,err_desc:null});
  });

  //console.log("Haaaaaaa");
  //console.log(req);
  //fs.readFile(req.files.image.path, function (err, data){ // readfilr from the given path
    // var dirname = path.resolve(".")+'/uploads/'; // path.resolve(“.”) get application directory path
    // var newPath = dirname +   req.files.image.originalFilename; // add the file name
    // fs.writeFile(newPath, data, function (err) { // write file in uploads folder
    //   if(err){
    //     res.json("Failed to upload your file");
    //   }else {
    //     res.json("Successfully uploaded your file");
    //   }
    // });
  //});

}

exports.create = function (req, res) {
  var part = req.files.file;
  if(part.mimetype != "application/zip" && part.mimetype != "application/octet-stream" && part.mimetype != "application/x-zip-compressed" && part.mimetype != "application/x-zip") {
    res.send({
      message: 'Please upload zip files only'
    })
  } else {
    var writeStream = gfs.createWriteStream({
      filename: part.name,
      mode: 'w',
      content_type:part.mimetype
    });

    writeStream.on('close', function(file) {
      return res.status(200).send({
        fileId: file._id,
        message: 'Success'
      });
    });
    
    writeStream.write(part.data);

    writeStream.end();
  }
}

exports.download = function (req, res) {
  var file = req.params.fileName;
  var departmentName = req.params.departmentName;
  var path = __dirname + '/../../uploads/' + departmentName + '/' + file;
  console.log(path);
  res.download(path);
}

exports.getFiles = function (req, res) {
  var departmentName = req.params.departmentName;
  fs.readdir(__dirname + '/../../uploads/' + departmentName + '/', function(err, items) {
    console.log(items);
    res.json(items);
  });
}

// exports.getSubDepartments = function (req, res) {
//   fs.readdir(__dirname + '/../../uploads/' + 'WebOps' + '/', function(err, items) {
//     console.log(items);
//     res.json(items);
//   });
// }

// exports.getTypes = function (req, res) {
//   fs.readdir(__dirname + '/../../uploads/' + 'WebOps' + '/', function(err, items) {
//     console.log(items);
//     res.json(items);
//   });
// }

exports.serve = function(req, res) {
  //res.json("Successfully uploaded your file");
  //var items=[{name:"Hello"}, {name:"Hey"}];
  fs.readdir(__dirname + '/../../uploads/WebOps/Frontend/Coord', function(err, items) {
    console.log(items);
    res.json(items);
  });
  

  // gfs.findOne({ _id: req.params.id}, function (err, file) {
  //     if(!file){
  //       return res.status(400).send({
  //         message: 'File not found'
  //       });
  //     }
  
  //   res.writeHead(200, {'Content-Type': file.contentType});
    
  //   var readstream = gfs.createReadStream({
  //       filename: file.filename
  //   });
 
  //     readstream.on('data', function(data) {
  //         res.write(data);
  //     });
      
  //     readstream.on('end', function() {
  //         res.end();        
  //     });
 
  //   readstream.on('error', function (err) {
  //     console.log('An error occurred!', err);
  //     throw err;
  //   });
  // });
}

exports.destroy = function (req, res) {
  gfs.remove({_id: req.params.id}, function (err) {
    if (err) return handleError(err);
    res.status(200).send({
      message: 'Success',
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