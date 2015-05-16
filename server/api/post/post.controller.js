'use strict';

var _ = require('lodash');
var Post = require('./post.model');
var User = require('../user/user.model');
var Department = require('../department/department.model');
var SubDepartment = require('../subDepartment/subDepartment.model');
var auth = require('../../auth/auth.service');

var mongoosePaginate = require('mongoose-paginate');



// Get list of posts
exports.index = function(req, res) {
  if(req.params.type != 'profile' && req.params.type != 'department' && req.params.type != 'subDepartment')
    return res.send(404);

  if(req.params.type === 'profile') {
    if(!req.params.id) { return res.send(404); }

    User.findById(req.params.id, function (err, user) {
      if(err) { return handleError(res, err); }
      if(!user) { return res.send(404); }
    });
    
    /*
    Fetches all posts depending on the id. Need to make it to fetch only first 20 and later on update
     */
    Post.find({ profile: req.params.id })
    .populate('profile department subDepartment createdBy')
    .sort('updatedOn')
    .exec(
      function (err, posts) {
      if(err) { return handleError(res, err); }
      if(!posts) { return res.send(404); }
      return res.json(200, posts);
    });
  }
  if(req.params.type === 'department') {
    if(!req.params.id) { return res.send(404); }
    if (req.user.department.indexOf(req.params.id) == -1){
      console.log("not allowed");
      return res.send(403);
    }

    Department.findById(req.params.id, function (err, dept) {
      if(err) { return handleError(res, err); }
      if(!dept) { return res.send(404); }
    });
    
    /*
    Fetches all posts depending on the id. Need to make it to fetch only first 20 and later on update
     */
    Post.find({ department: req.params.id }, function (err, posts) {
      if(err) { return handleError(res, err); }
      if(!posts) { return res.send(404); }
      return res.json(200, posts);
    })
    .populate('profile department subDepartment createdBy')
    .sort('updatedOn');
  }
  if(req.params.type === 'subDepartment') {
    if(!req.params.id) { return res.send(404); }
    if (req.user.subDepartment.indexOf(req.params.id) == -1){
      console.log("not allowed");
      return res.send(403);
    }
    subDepartment.findById(req.params.id, function (err, subDept) {
      if(err) { return handleError(res, err); }
      if(!subDept) { return res.send(404); }
    });
    
    /*
    Fetches all posts depending on the id. Need to make it to fetch only first 20 and later on update
     */
    Post.find({ subDepartment: req.params.id }, function (err, posts) {
      if(err) { return handleError(res, err); }
      if(!posts) { return res.send(404); }
      return res.json(200, posts);
    })
    .populate('profile department subDepartment createdBy')
    .sort('updatedOn');
  }
};

// Get comiled list of all posts related to one user
// TODO: Limit it to 10 posts, send the next 10 and so on
exports.newsfeed = function(req, res) {
  Post.find({
    $or: [
      {department: {$in: req.user.department}},
      {subDepartment: {$in: req.user.subDepartment}},
      {profile: req.user._id}
    ]}
  )
  .sort('-updatedOn')
  .exec(
    function (err, post) {
      if(err) { return handleError(res, err); }
      if(!post) { return res.send(404); }
      return res.json(post);
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
exports.createPost = function(req, res) {
  var newPost = new Post();
  console.log(req.body.destId);
  if(!req.body.destId) { return res.send(404); }
  if(req.body.type != 'profile' && req.body.type != 'department' && req.body.type != 'subDepartment')
    return res.send(404);

  if(req.body.type === 'profile') {
    User.findById(req.body.destId, function (err, user) {
      if(err) { return handleError(res, err); }
      if(!user) { return res.send(404); }
    });
  }

  if(req.body.type === 'department') {
    Department.findById(req.body.destId, function (err, dept) {
      if(err) { return handleError(res, err); }
      if(!dept) { return res.send(404); }
    });
  }

  if(req.body.type === 'subDepartment') {
    subDepartment.findById(req.body.destId, function (err, subDept) {
      if(err) { return handleError(res, err); }
      if(!subDept) { return res.send(404); }
    });
  }
  newPost.title = req.body.title;
  newPost.info = req.body.info;
  newPost[req.body.type] = req.body.destId;
  
  newPost.createdBy = req.user._id;

  newPost.createdOn = Date.now();
  newPost.updatedOn = Date.now();

  newPost.save(function (err, post) {
    if (err) { return handleError(res, err); }
    else res.json(201, post);
  });
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

exports.paginate = function (req, res) {
  Post.plugin(mongoosePaginate)

  Post.paginate({}, 2, 10, function(error, pageCount, paginatedResults, itemCount) {
    if (error) {
      console.error(error);
    } else {
      console.log('Pages:', pageCount);
      console.log(paginatedResults);
    }
  });
}

function handleError(res, err) {
  return res.send(500, err);
}