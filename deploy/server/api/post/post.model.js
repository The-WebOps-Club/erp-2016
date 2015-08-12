'use strict';

var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    deepPopulate = require('mongoose-deep-populate'),
    autopopulate = require('mongoose-autopopulate');


var PostSchema = new Schema({
  title: String,
  info: String,
  logic: { type: Number, default: 1},
  wall: { type: Schema.Types.ObjectId, ref: 'Wall', autopopulate: {select: 'name parentId'} },
  // department: { type: Schema.Types.ObjectId, ref: 'Department' },
  // subDepartment: { type: Schema.Types.ObjectId, ref: 'SubDepartment' },
  // profile: { type: Schema.Types.ObjectId, ref: 'User' },
  taggedTo: [],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
  acknowledged: [{ type: Schema.Types.ObjectId, ref: 'User', autopopulate: {select: 'name'} }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', autopopulate: {select: 'name'} },
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

PostSchema.plugin(autopopulate);
PostSchema.plugin(mongoosePaginate);
PostSchema.plugin(deepPopulate, {
  populate: {
    'comments.createdBy': {
      select: 'name'
    }
  }
});

module.exports = mongoose.model('Post', PostSchema);