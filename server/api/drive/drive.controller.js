'use strict';

var _ = require('lodash');
var Drive = require('./drive.model');
var googleapis = require('googleapis');
var drive = googleapis.drive('v2');
var request = require('request');
// Get list of drives

var authClient = new googleapis.auth.JWT(
    '1098288519249-l0o2d540m11bvd823trbsn2gv5j55lns@developer.gserviceaccount.com',
    __dirname+'/../../config/googleapi_key.pem',
    // Contents of private_key.pem if you want to load the pem file yourself
    // (do not use the path parameter above if using this param)
    null,
    ['https://www.googleapis.com/auth/drive'],
    // User to impersonate (leave empty if no impersonation needed)
    'deepak@saarang.org');

exports.createFile = function(req,res){
  var part = req.files.file;
  authClient.authorize(function(err, tokens) {
    if (err) {
      console.log(err);
      return;
    }
    else {
      console.log(part);
      drive.files.insert({
        resource: {
          title: part.name,
          mimeType: part.mimetype
        },
        media: {
          mimeType: part.mimetype,
          body: part.data
        },
        auth:authClient
      },function (err,response){
        if(err){
          console.log("error");
        }
        else {
          console.log("file successfully uploaded");
        }
      });
    }
  });
}

exports.createFolder = function (req, res){
    authClient.authorize(function(err, tokens) {
    if (err) {
      console.log(err);
      return;
    }
    else {
      drive.files.insert({
        resource: {
          title: req.body.name,
          mimeType: 'application/vnd.google-apps.folder'
        },
        auth:authClient
      },function (err,response){
        if(err){
          console.log("error");
        }
        else {
          console.log("folder created successfully");
        }
      });
    }
  });
}

exports.listAll = function (req,res) {
  authClient.authorize(function(err, tokens) {
    if (err) {
      console.log(err);
      return;
    }
    else {
      drive.files.list({ auth: authClient }, function(err, resp) {
        var files = resp.items;
        if(err){
          console.log(err);
        }
        if(files.length==0){
          console.log("no files found");
          return;
        }
        else {
          var i=0;
          for(;i<files.length;i++){
            console.log(files[i].title+'    '+files[i].id);
          }
        }
      });
    }
  });
}

exports.createFileInFolder = function (req, res){
  var part = req.files.file;
  var folderId = req.params.folderId;
  authClient.authorize(function(err, tokens) {
    if (err) {
      console.log(err);
      return;
    }
    else {
      console.log(part);
      drive.files.insert({
        resource: {
          title: part.name,
          mimeType: part.mimetype,
          "parents": [{
            "kind": "drive#fileLink",
            "id": folderId
          }]
        },
        media: {
          mimeType: part.mimetype,
          body: part.data
        },
        auth:authClient
      },function (err,response){
        if(err){
          console.log("error");
        }
        else {
          console.log("file successfully uploaded");
        }
      });
    }
  });
}

exports.listFolder = function (req, res){
  var folderId= req.params.folderId;
  console.log(folderId);
  authClient.authorize(function(err, tokens) {
    if (err) {
      console.log(err+ "is the error");
      return;
    }
    else {
      drive.children.list({
        folderId:folderId,
        auth:authClient
      },function (err,response){
        if(response){
          var files = response.items;
          var i=0;
          for(i=0;i<files.length;i++){
            console.log(files[i]);  // only ids useful from this..
          }
        }
        else {
          console.log("no files in that folder");
        }
      });  
    }
  });
}

exports.createFolderInFolder = function (req, res){
  var parentId = req.params.parentId;
  authClient.authorize(function(err, tokens) {
    if (err) {
      console.log(err);
      return;
    }
    else {
      drive.files.insert({
        resource: {
          title: req.body.name,
          mimeType: 'application/vnd.google-apps.folder',
          "parents": [{
            "kind": "drive#fileLink",
            "id": parentId
          }]
        },
        auth:authClient
      },function (err,response){
        if(err){
          console.log("error");
        }
        else {
          console.log("folder successfully uploaded");
        }
      });
    }
  });
}

exports.downloadFile = function (req,res){
  var fileId = req.params.fileId;
  authClient.authorize(function(err, tokens) {
    if (err) {
      console.log(err);
      return;
    }
    else {
      drive.files.get({fileId:fileId,auth:authClient},function (err,file){
        if(err) { return handleError(res, err);}
        return res.json({file:file,access_token:tokens.access_token});
      })
    }
  });

}

exports.index = function(req, res) {
  Drive.find(function (err, drives) {
    if(err) { return handleError(res, err); }
    return res.json(200, drives);
  });
};
// Get a single drive
exports.show = function(req, res) {
  Drive.findById(req.params.id, function (err, drive) {
    if(err) { return handleError(res, err); }
    if(!drive) { return res.send(404); }
    return res.json(drive);
  });
};

// Creates a new drive in the DB.
exports.create = function(req, res) {
  Drive.create(req.body, function(err, drive) {
    if(err) { return handleError(res, err); }
    return res.json(201, drive);
  });
};

// Updates an existing drive in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Drive.findById(req.params.id, function (err, drive) {
    if (err) { return handleError(res, err); }
    if(!drive) { return res.send(404); }
    var updated = _.merge(drive, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, drive);
    });
  });
};

// Deletes a drive from the DB.
exports.destroy = function(req, res) {
  Drive.findById(req.params.id, function (err, drive) {
    if(err) { return handleError(res, err); }
    if(!drive) { return res.send(404); }
    drive.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};


function handleError(res, err) {
  return res.send(500, err);
}