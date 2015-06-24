'use strict';

var _ = require('lodash');
var Post = require('./post.model');
var Wall = require('../wall/wall.model');
var Comment = require('../comment/comment.model');
var User = require('../user/user.model');
var Department = require('../department/department.model');
var SubDepartment = require('../subDepartment/subDepartment.model');
var auth = require('../../auth/auth.service');

var mongoosePaginate = require('mongoose-paginate');

var POSTSPERPAGE = 20

// Get list of posts
exports.index = function(req, res) {
  console.log(req.params.id);
  Post.paginate(
      {wall: req.params.id}, req.params.page, POSTSPERPAGE, function(error, pageCount, paginatedResults, itemCount) {
      if (error) {
        console.error(error);
      } else {
        res.send(paginatedResults);
      }
    }, {populate: 'wall createdBy', sortBy : { updatedOn : -1 }});
};

// Get compiled list of all posts related to one user
// Will be given an array of walls.
// TODO: Limit it to 10 posts, send the next 10 and so on
exports.newsfeed = function(req, res) {
  var required  = []
  required.push(req.user._id)
  required.push(req.user.department)
  required.push(req.user.subDepartment)
  Wall.find({parentId: {$in: required}}, '_id', function (err, walls) {
    required = [] //Reusing the variable used above
    for (var i = walls.length - 1; i >= 0; i--) {
      required.push(walls[i]._id)
    };
    Post.paginate(
      {wall: {$in: required}}, req.params.page, POSTSPERPAGE, function(error, pageCount, paginatedResults, itemCount) {
      if (error) {
        console.error(error);
      } else {
        res.send(paginatedResults);
      }
    }, {populate: 'wall createdBy', sortBy : { updatedOn : -1 }});
  })
};

exports.newsfeedRefresh = function(req, res) {
  var required  = []
  required.push(req.user._id)
  required.push(req.user.department)
  required.push(req.user.subDepartment)
  Wall.find({parentId: {$in: required}}, '_id', function (err, walls) {
    required = [] //Reusing the variable used above
    for (var i = walls.length - 1; i >= 0; i--) {
      required.push(walls[i]._id)
    };
    Post.find({
      updatedOn:{
        $gte: new Date(2014, 5, 4)
      },
      wall: {$in: required}
    }, function (err, posts) {
      console.log(posts)
      if(err) { return handleError(res, err); }
      if(!posts) { return res.send(404); }
      return res.json(posts);
    })
  });
}

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
  console.log(req.body.destId);
  if(!req.body.destId) { return res.send(404); }
  Wall.findOne({parentId: req.body.destId}, function (err, wall) {
    if(err) { return handleError(res, err); }
    if(!wall) { return res.send(404); }
    console.log(wall);
    newPost.title = req.body.title;
    newPost.info = req.body.info;
    newPost.wall = wall._id;
    
    newPost.createdBy = req.user._id;

    newPost.createdOn = Date.now();
    newPost.updatedOn = Date.now();

    newPost.save(function (err, post) {
      if (err) { return handleError(res, err); }
      else res.json(201, post);
    });
  });  
};

// Appends a new comment to the existing post
exports.addComment = function(req, res) {
  console.log(req.body);
  Post.findById(req.body.postId, function (err, post) {
    if (err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    
    var comment = new Comment();
    comment.createdBy = req.user._id;
    comment.info = req.body.comment;
    comment.createdOn = Date(Date.now());
    comment.updatedOn = Date(Date.now());

    post.updatedOn = Date.now();

    post.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, post);
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