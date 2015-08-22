'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HostelSchema = new Schema({
  name: String,
  info: String,
  rooms: [Schema.ObjectId]
});

module.exports = mongoose.model('Hostel', HostelSchema);