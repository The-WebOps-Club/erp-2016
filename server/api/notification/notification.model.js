'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    deepPopulate = require('mongoose-deep-populate');

//post: ID of the post being notified to
//user: User to whom the notification belongs
//postedBy, commentedBy: Users who posted or commented
//action: 'post' or 'comment' to show which action has been done

var NotificationSchema = new Schema({
  name: String,
  info: String,
  action: String,
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  commentedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  active: Boolean
});

NotificationSchema.plugin(deepPopulate, {
  populate: {
    'post.comments': {
      sort: {updatedOn: 1}
    },
    'post.wall': {
      select: 'name'
    },
    'postedBy' : {
      select: 'name'
    },
    'commentedBy' : {
      select: 'name'
    },
    'user' : {
      select: 'deviceId email'
    },
    'post.comments.createdBy': {
      select: 'name deviceId'
    },
  }
});
module.exports = mongoose.model('Notification', NotificationSchema);