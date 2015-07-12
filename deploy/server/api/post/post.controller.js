'use strict';

var _ = require('lodash');
<<<<<<< HEAD
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
=======
var forEach = require('async-foreach').forEach;
var Post = require('./post.model');
var Wall = require('../wall/wall.model');
var Comment = require('../comment/comment.model');
var User = require('../user/user.model');
var Department = require('../department/department.model');
var SubDepartment = require('../subDepartment/subDepartment.model');
var auth = require('../../auth/auth.service');
var notifier = require('../notification/notification.controller');

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
      {wall: {$in: required}}, req.params.page, POSTSPERPAGE,  function (error, pageCount,  paginatedResults, itemCount) {
      if (error) {
        return handleError(res, error);
      }
      if (paginatedResults.length === 0){
        res.status(404).send(paginatedResults);
      }
      else {
        console.log(paginatedResults);
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
>>>>>>> master
  });
};

// Creates a new post in the DB.
exports.createPost = function(req, res) {
  var newPost = new Post();
<<<<<<< HEAD
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

=======
  if(!req.body.destId) { return res.send(404); }
  Wall.findOne({parentId: req.body.destId}, function (err, wall) {
    if(err) { return handleError(res, err); }
    if(!wall) { return res.send(404); }
    console.log(wall);
    console.log(newPost);
    newPost.title = req.body.title;
    newPost.info = req.body.info;
    newPost.wall = wall._id;
    
>>>>>>> master
    newPost.createdBy = req.user._id;

    newPost.createdOn = Date.now();
    newPost.updatedOn = Date.now();

    newPost.save(function (err, post) {
      if (err) { return handleError(res, err); }
<<<<<<< HEAD
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
=======
      else{
        console.log('notiying');
        notifier.notifyAll(post._id, function(){
          return res.json(201, post);
        });
      }
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
>>>>>>> master

// Appends a new comment to the existing post
exports.addComment = function(req, res) {
  Post.findById(req.body.postId, function (err, post) {
    if (err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    
<<<<<<< HEAD
    var comment = {};
    comment.name = req.user.name;
    comment.id = req.user._id;
    comment.email = req.user.email;
=======
    var comment = new Comment();
    comment.createdBy = req.user._id;
>>>>>>> master
    comment.info = req.body.comment;
    comment.createdOn = Date(Date.now());
    comment.updatedOn = Date(Date.now());

<<<<<<< HEAD
    post.updatedOn = Date.now();

    post.comments.push(comment);
    post.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, post);
=======
    comment.save(function (err) {
      if (err) { return handleError(res, err); }
      post.comments.push(comment._id)
      post.updatedOn = Date.now();

      post.save(function (err)   {
        if (err) { return handleError(res, err); }
        Post.findById(req.body.postId)
        .populate('acknowledged', 'name')
        .deepPopulate('comments.createdBy')
        .exec(function (err, post) {
          if (err) { return handleError(res, err); }
          if(!post) { return res.send(404); }
          notifier.notifyAll(post._id, function(){
            return res.json(201, comment);
          });
        });
      });
>>>>>>> master
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