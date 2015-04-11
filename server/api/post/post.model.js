'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  info: String,
  department: { type: Schema.Types.ObjectId, ref: 'Department' },
  subDepartment: { type: Schema.Types.ObjectId, ref: 'SubDepartment' },
  profile: { type: Schema.Types.ObjectId, ref: 'User' },
  taggedTo: [],
  comments: [],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  seenBy: [],
  createdOn: {
  	type: Date,
  	default: Date.now
  },
  updatedOn: {
  	type: Date,
  	default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);