'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DepartmentSchema = new Schema({
  name: String,
  info: String,
  calendar: String,
  folder: String,
  wall: { type: Schema.Types.ObjectId, ref: 'Wall' },
  subDepartments: [{ type: Schema.Types.ObjectId, ref: 'SubDepartment' }],
  cores: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  superCoords: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  coords: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  qms: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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