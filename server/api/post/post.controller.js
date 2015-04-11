'use strict';

var _ = require('lodash');
var Post = require('./post.model');

// Get list of posts
exports.index = function(req, res) {
  if(req.params.type != 'profile' && req.params.type != 'department' && req.params.type != 'subDepartment')
    return res.send(404);
  if(req.params.type === 'profile') {
    if(!req.query.userId) { return res.send(404); }
    if(req.query.userId) {
      /*
      Fetches all posts depending on the id. Need to make it to fetch only first 20 and later on update
       */
      Post.find({ profile: req.query.userId }, function (err, posts) {
        if(err) { return handleError(res, err); }
        return res.json(200, posts);
      });
    }
  }
  if(req.params.type === 'department') {
    if(!req.query.deptId) { return res.send(404); }
    if(req.query.deptId) {
      /*
      Fetches all posts depending on the id. Need to make it to fetch only first 20 and later on update
      ===========Need to complete this================
       */

    }
  }
  if(req.params.type === 'subDepartment') {
    if(!req.query.deptId || !req.query.subDeptId) { return res.send(404); }
    if(req.query.deptId && req.query.subDeptId) {
      /*
      Fetches all posts depending on the id. Need to make it to fetch only first 20 and later on update
      ===========Need to complete this================
       */

    }
  }
  

  // Post.find(function (err, posts) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, posts);
  // });
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
exports.createPost = function(req, res) {
  var newPost = new Post();
  var stateParams = req.body.stateParams;
  console.log(newPost);

  if(req.body.type === 'profile') {
    if(!stateParams.userId) { return res.send(404); }
    newPost.title = req.body.title;
    newPost.info = req.body.info;
    newPost.profile = req.user._id;

    newPost.createdBy = req.user._id;

    newPost.createdOn = Date.now();
    newPost.updatedOn = Date.now();

  console.log(newPost);


    newPost.save(function (err, post) {
      if (err) { return handleError(res, err); }
      else res.send({type: 'success', msg: 'Created successfully'});
    });
  }

  // Post.create(req.body, function(err, post) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(201, post);
  // });
};

// Appends a new comment to the existing post
exports.addComment = function(req, res) {
  Post.findById(req.body.postId, function (err, post) {
    if (err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    
    var comment = {};
    comment.name = req.user.name;
    comment.id = req.user._id;
    comment.email = req.user.email;
    comment.info = req.body.comment;
    comment.createdOn = Date(Date.now());
    comment.updatedOn = Date(Date.now());

    post.updatedOn = Date.now();

    post.comments.push(comment);
    post.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.send({type: 'success', msg: 'Created successfully'});
    });
  });
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