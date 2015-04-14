'use strict';

var _ = require('lodash');
var multiparty = require('multiparty');

// Creates a new upload in the DB. 
// Will upload to a temp folder, need to move the file away later.
// Use UUID and fs to rename and relocate the folder accordingly
exports.create = function(req, res) {
  var form = new multiparty.Form();

  form.parse(req, function(err, fields, files) {
    console.log(fields);
    res.json(200, files);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}