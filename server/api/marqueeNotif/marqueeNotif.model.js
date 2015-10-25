'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MarqueeNotifSchema = new Schema({
  info: String,
  createdOn: { type: Date },
  updatedOn: { type: Date }
});

module.exports = mongoose.model('MarqueeNotif', MarqueeNotifSchema);