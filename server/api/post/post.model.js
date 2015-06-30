'use strict';

var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    deepPopulate = require('mongoose-deep-populate');


var PostSchema = new Schema({
  title: String,
  info: String,
  logic: { type: Number, default: 1},
  wall: { type: Schema.Types.ObjectId, ref: 'Wall' },
  // department: { type: Schema.Types.ObjectId, ref: 'Department' },
  // subDepartment: { type: Schema.Types.ObjectId, ref: 'SubDepartment' },
  // profile: { type: Schema.Types.ObjectId, ref: 'User' },
  taggedTo: [],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
  acknowledged: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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

PostSchema.plugin(mongoosePaginate);
PostSchema.plugin(deepPopulate, {
  populate: {
    'comments.createdBy': {
      select: 'name profilePic'
    }
  }
});

module.exports = mongoose.model('Post', PostSchema);