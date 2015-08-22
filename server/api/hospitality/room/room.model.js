'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RoomSchema = new Schema({
  number: Number,
  active: Boolean,
  capacity: Number
});

module.exports = mongoose.model('Room', RoomSchema);