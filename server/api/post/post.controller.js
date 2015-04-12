'use strict';

var _ = require('lodash');
var Post = require('./post.model');
var User = require('../user/user.model');
var Department = require('../department/department.model');
var SubDepartment = require('../subDepartment/subDepartment.model');

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
    Post.find({ profile: req.params.id }, function (err, posts) {
      if(err) { return handleError(res, err); }
      if(!posts) { return res.send(404); }
      return res.json(200, posts);
    })
    .populate('profile department subDepartment createdBy');
  }
  if(req.params.type === 'department') {
    if(!req.params.id) { return res.send(404); }

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
    .populate('profile department subDepartment createdBy');
  }
  if(req.params.type === 'subDepartment') {
    if(!req.params.id) { return res.send(404); }

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
    .populate('profile department subDepartment createdBy');
  }
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

    User.findById(stateParams.userId, function (err, user) {
      if(err) { return handleError(res, err); }
      if(!user) { return res.send(404); }
    });

    newPost.title = req.body.title;
    newPost.info = req.body.info;
    newPost.stateParams.deptId;

    newPost.createdBy = req.user._id;

    newPost.createdOn = Date.now();
    newPost.updatedOn = Date.now();

    newPost.save(function (err, post) {
      if (err) { return handleError(res, err); }
      else res.json(201, post);
    });
  }

  if(req.body.type === 'department') {
    if(!stateParams.deptId) { return res.send(404); }

    Department.findById(stateParams.deptId, function (err, dept) {
      if(err) { return handleError(res, err); }
      if(!dept) { return res.send(404); }
    });

    newPost.title = req.body.title;
    newPost.info = req.body.info;
    newPost.department = stateParams.deptId;

    newPost.createdBy = req.user._id;

    newPost.createdOn = Date.now();
    newPost.updatedOn = Date.now();

    newPost.save(function (err, post) {
      if (err) { return handleError(res, err); }
      else res.json(201, post);
    });
  }

  if(req.body.type === 'subDepartment') {
    if(!stateParams.deptId) { return res.send(404); }

    subDepartment.findById(stateParams.subDeptId, function (err, subDept) {
      if(err) { return handleError(res, err); }
      if(!subDept) { return res.send(404); }
    });

    newPost.title = req.body.title;
    newPost.info = req.body.info;
    newPost.department = stateParams.subDeptId;

    newPost.createdBy = req.user._id;

    newPost.createdOn = Date.now();
    newPost.updatedOn = Date.now();

    newPost.save(function (err, post) {
      if (err) { return handleError(res, err); }
      else res.json(201, post);
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