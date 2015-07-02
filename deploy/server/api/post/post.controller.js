'use strict';

var _ = require('lodash');
var forEach = require('async-foreach').forEach;
var Post = require('./post.model');
var Wall = require('../wall/wall.model');
var Comment = require('../comment/comment.model');
var User = require('../user/user.model');
var Department = require('../department/department.model');
var SubDepartment = require('../subDepartment/subDepartment.model');
var auth = require('../../auth/auth.service');

var POSTSPERPAGE = 20

// Get list of posts
exports.index = function(req, res) {
  Post.paginate(
      {wall: req.params.id}, req.params.page, POSTSPERPAGE, function(error, pageCount, paginatedResults, itemCount) {
      if (error) {
        return handleError(res, error);
      } else {
        var populated = []
        forEach(paginatedResults, function(post, index, arr) {
          var done = this.async();
          post.deepPopulate('comments.createdBy', function (err, _post) {
            populated.push(_post);
            done();
          });
        }, function allDone (notAborted, arr) {
          res.status(200).send(populated);
        });
      }
    }, {populate: {path: 'acknowledged', select: 'name'}, sortBy : { updatedOn : -1 }});
};

exports.refresh = function(req, res) {
  Post.find({
    updatedOn:{
      $gt: req.body.date
    },
    wall: req.params.id
  })
  .sort({ updatedOn : -1 })
  .populate('acknowledged', 'name')
  .exec(function (err, posts) {
    if(err) { return handleError(res, err); }
    if(!posts) { return res.send(404); }
    var populated = []
    forEach(posts, function(post, index, arr) {
      var done = this.async();
      post.deepPopulate('comments.createdBy', function (err, _post) {
        populated.push(_post);
        done();
      });
    }, function allDone (notAborted, arr) {
      res.status(200).send(populated);
    });
  });
}

exports.history = function(req, res) {
  Post.find({
    updatedOn:{
      $lt: req.body.date
    },
    wall: req.params.id
  })
  .sort({ updatedOn : -1 })
  .populate('acknowledged', 'name')
  .exec(function (err, posts) {
    if(err) { return handleError(res, err); }
    if(!posts) { return res.send(404); }
    var populated = []
    forEach(posts, function(post, index, arr) {
      var done = this.async();
      post.deepPopulate('comments.createdBy', function (err, _post) {
        populated.push(_post);
        done();
      });
    }, function allDone (notAborted, arr) {
      res.status(200).send(populated);
    });
  });
}

// Get compiled list of all posts related to one user
// Will be given an array of walls.
// TODO: Limit it to 10 posts, send the next 10 and so on
exports.newsfeed = function(req, res) {
  var required  = []
  required.push(req.user._id)
  required.push(req.user.department)
  required.push(req.user.subDepartment)
  required.push(req.user.groups)
  Wall.find({parentId: {$in: required}}, '_id', function (err, walls) {
    required = [] //Reusing the variable used above
    for (var i = walls.length - 1; i >= 0; i--) {
      required.push(walls[i]._id)
    };
    Post.paginate(
      {wall: {$in: required}}, req.params.page, POSTSPERPAGE, function (error, pageCount, paginatedResults, itemCount) {
      if (error) {
        return handleError(res, error);
      }
      if (paginatedResults.length === 0){
        res.status(404).send(paginatedResults);
      }
      else {
        var populated = []
        forEach(paginatedResults, function(post, index, arr) {
          var done = this.async();
          post.deepPopulate('comments.createdBy', function (err, _post) {
            populated.push(_post);
            done();
          });
        }, function allDone (notAborted, arr) {
          res.status(200).send(populated);
        });
      }
    }, {populate: {path: 'acknowledged', select: 'name'}, sortBy : { updatedOn : -1 }});
  })
};

exports.newsfeedRefresh = function(req, res) {
  var required  = []
  required.push(req.user._id)
  required.push(req.user.department)
  required.push(req.user.subDepartment)
  required.push(req.user.groups)
  Wall.find({parentId: {$in: required}}, '_id', function (err, walls) {
    required = [] //Reusing the variable used above
    for (var i = walls.length - 1; i >= 0; i--) {
      required.push(walls[i]._id)
    };
    Post.find({
      updatedOn:{
        $gt: req.body.date
      },
      wall: {$in: required}
    })
    .sort({updatedOn: -1})
    .populate('acknowledged', 'name')
    .exec(function (err, posts) {
      if(err) { return handleError(res, err); }
      if(!posts) { return res.send(404); }
      var populated = []
      forEach(posts, function(post, index, arr) {
        var done = this.async();
        post.deepPopulate('comments.createdBy', function (err, _post) {
          populated.push(_post);
          done();
        });
      }, function allDone (notAborted, arr) {
        res.status(200).send(populated);
      });
    })
  });
}

exports.newsfeedHistory = function(req, res) {
  var required  = []
  required.push(req.user._id)
  required.push(req.user.department)
  required.push(req.user.subDepartment)
  required.push(req.user.groups)
  Wall.find({parentId: {$in: required}}, '_id', function (err, walls) {
    required = [] //Reusing the variable used above
    for (var i = walls.length - 1; i >= 0; i--) {
      required.push(walls[i]._id)
    };
    Post.find({
      updatedOn:{
        $lt: req.body.date
      },
      wall: {$in: required}
    })
    .populate('acknowledged', 'name')
    .exec(function (err, posts) {
      if(err) { return handleError(res, err); }
      if(!posts) { return res.send(404); }
      var populated = []
      forEach(posts, function(post, index, arr) {
        var done = this.async();
        post.deepPopulate('comments.createdBy', function (err, _post) {
          populated.push(_post);
          done();
        });
      }, function allDone (notAborted, arr) {
        res.status(200).send(populated);
      });
    })
  });
}

// Get a single post
exports.show = function(req, res) {
  Post.findById(req.params.id)
  .populate('acknowledged', 'name')
  .exec(function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    post.deepPopulate('comments.createdBy', function (err, post) {
      return res.status(200).json(post);
    });
  });
};

// Creates a new post in the DB.
exports.createPost = function(req, res) {
  var newPost = new Post();
  if(!req.body.destId) { return res.send(404); }
  Wall.findOne({parentId: req.body.destId}, function (err, wall) {
    if(err) { return handleError(res, err); }
    if(!wall) { return res.send(404); }
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

//Acknowledges a post

exports.acknowledge = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) { return handleError(res, err); }
    if(!post) { return res.status(404).json({message: "Post not found"}); }
    if(post.acknowledged.indexOf(req.user._id) === -1 ){ 
      post.acknowledged.push(req.user._id);
      post.save(function (err, post) {
        if (err) { return handleError(res, err); }
        else res.status(200).json({message: "Acknowledged"})
      });
    }
    else{ res.status(200).json({message: "Already acknowledged"}); }
  });
}

// Appends a new comment to the existing post
exports.addComment = function(req, res) {
  Post.findById(req.body.postId, function (err, post) {
    if (err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    
    var comment = new Comment();
    comment.createdBy = req.user._id;
    comment.info = req.body.comment;
    comment.createdOn = Date(Date.now());
    comment.updatedOn = Date(Date.now());

    comment.save(function (err) {
      if (err) { return handleError(res, err); }
      post.comments.push(comment._id)
      post.updatedOn = Date.now();

      post.save(function (err) {
        if (err) { return handleError(res, err); }
        Post.findById(req.body.postId)
        .populate('acknowledged', 'name')
        .deepPopulate('comments.createdBy')
        .exec(function (err, post) {
          if (err) { return handleError(res, err); }
          if(!post) { return res.send(404); }
          return res.json(200, post);
        });
      });
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