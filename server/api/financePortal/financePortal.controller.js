'use strict';

var _ = require('lodash');
var FinancePortal = require('./financePortal.model');

// Get list of financePortals
exports.index = function(req, res) {
  FinancePortal.find(function (err, financePortals) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(financePortals);
  });
};

// Get a single financePortal
exports.show = function(req, res) {
  FinancePortal.findById(req.params.id, function (err, financePortal) {
    if(err) { return handleError(res, err); }
    if(!financePortal) { return res.status(404).send('Not Found'); }
    return res.json(financePortal);
  });
};

// Creates a new financePortal in the DB.
exports.create = function(req, res) {
  FinancePortal.create(req.body, function(err, financePortal) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(financePortal);
  });
};

// Updates an existing financePortal in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  FinancePortal.findById(req.params.id, function (err, financePortal) {
    if (err) { return handleError(res, err); }
    if(!financePortal) { return res.status(404).send('Not Found'); }
    var updated = _.merge(financePortal, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(financePortal);
    });
  });
};

// Deletes a financePortal from the DB.
exports.destroy = function(req, res) {
  FinancePortal.findById(req.params.id, function (err, financePortal) {
    if(err) { return handleError(res, err); }
    if(!financePortal) { return res.status(404).send('Not Found'); }
    financePortal.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}