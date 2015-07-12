'use strict';

var mongoose = require('mongoose'),
<<<<<<< HEAD
    Schema = mongoose.Schema;
=======
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    deepPopulate = require('mongoose-deep-populate'),
    autopopulate = require('mongoose-autopopulate');

>>>>>>> master

var PostSchema = new Schema({
  title: String,
  info: String,
<<<<<<< HEAD
  department: { type: Schema.Types.ObjectId, ref: 'Department' },
  subDepartment: { type: Schema.Types.ObjectId, ref: 'SubDepartment' },
  profile: { type: Schema.Types.ObjectId, ref: 'User' },
  taggedTo: [],
  comments: [],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
=======
  logic: { type: Number, default: 1},
  wall: { type: Schema.Types.ObjectId, ref: 'Wall', autopopulate: {select: 'name parentId'} },
  // department: { type: Schema.Types.ObjectId, ref: 'Department' },
  // subDepartment: { type: Schema.Types.ObjectId, ref: 'SubDepartment' },
  // profile: { type: Schema.Types.ObjectId, ref: 'User' },
  taggedTo: [],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
  acknowledged: [{ type: Schema.Types.ObjectId, ref: 'User', autopopulate: {select: 'name'} }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', autopopulate: {select: 'name'} },
>>>>>>> master
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

<<<<<<< HEAD
=======
PostSchema.plugin(autopopulate);
PostSchema.plugin(mongoosePaginate);
PostSchema.plugin(deepPopulate, {
  populate: {
    'comments.createdBy': {
      select: 'name'
    }
  }
});

>>>>>>> master
module.exports = mongoose.model('Post', PostSchema);