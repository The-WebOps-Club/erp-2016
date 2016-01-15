'use strict';

var _ = require('lodash');
var Test = require('./test.model');

/*// Get list of tests
exports.index = function(req, res) {
  Test.find(function (err, tests) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(tests);
  });
};
*/

exports.index = function(req, res) {
  res.send("Active");
};

/*// Get a single test


// Creates a new test in the DB.
exports.create = function(req, res) {
  Test.create(req.body, function(err, test) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(test);
  });
};

// Updates an existing test in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Test.findById(req.params.id, function (err, test) {
    if (err) { return handleError(res, err); }
    if(!test) { return res.status(404).send('Not Found'); }
    var updated = _.merge(test, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(test);
    });
  });
};

// Deletes a test from the DB.
exports.destroy = function(req, res) {
  Test.findById(req.params.id, function (err, test) {
    if(err) { return handleError(res, err); }
    if(!test) { return res.status(404).send('Not Found'); }
    test.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};*/

function handleError(res, err) {
  return res.status(500).send(err);
}