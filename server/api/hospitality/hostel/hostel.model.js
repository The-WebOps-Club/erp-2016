'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HostelSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  rooms: [Schema.ObjectId]
});

module.exports = mongoose.model('Hostel', HostelSchema);