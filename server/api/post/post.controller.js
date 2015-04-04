'use strict';

var _ = require('lodash');
var Post = require('./post.model');

// Get list of posts
exports.index = function(req, res) {
  Post.find(function (err, posts) {
    if(err) { return handleError(res, err); }
    return res.json(200, posts);
  });
};

// Get a single post
exports.show = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    return res.json(post);
  });
};

// Creates a new post in the DB.
exports.create = function(req, res) {
  var newPost = new Post();
  var title = req.body.title;
  var info = req.body.info;
  var stateParams = req.body.stateParams;

  if(stateParams.type === 'profile') {
    if(!stateParams.id) { console.log('no id'); return res.send(404); }
    newPost.title = title;
    newPost.info = info;
    newPost.profile = req.user._id;
    newPost.createdBy = req.user._id;
    newPost.createdOn = Date.now();
    newPost.updatedOn = Date.now();

    newPost.save(function(err, post) {
      if(err) { console.log(err); return handleError(res, err); }
      else res.send({type: 'success', msg: 'Created successfully'});
    });
  }

  // Post.create(req.body, function(err, post) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(201, post);
  // });
};

// Updates an existing post in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Post.findById(req.params.id, function (err, post) {
    if (err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    var updated = _.merge(post, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, post);
    });
  });
};

// Deletes a post from the DB.
exports.destroy = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    post.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}