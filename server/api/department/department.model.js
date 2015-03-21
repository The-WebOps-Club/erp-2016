'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DepartmentSchema = new Schema({
  name: String,
  info: String,
  subDepartments: {},
  members: {}
});

module.exports = mongoose.model('Department', DepartmentSchema);