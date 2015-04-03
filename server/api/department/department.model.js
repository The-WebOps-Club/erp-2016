'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DepartmentSchema = new Schema({
  name: String,
  info: String,
  calendar: String,
  folder: String,
  subDepartments: {},
  cores: {},
  superCoords: {},
  coords: {},
  qms: {},
  canPost: {},
  createdOn: {
  	type: Date,
  	default: Date.now
  },
  updatedOn: {
  	type: Date,
  	default: Date.now
  }
});

module.exports = mongoose.model('Department', DepartmentSchema);