'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
 
 var autopopulate= require('mongoose-autopopulate');


var RoomSchema = new Schema({
  number: Number,
  active: Boolean,
  capacity: Number,
  hostel: { type: Schema.Types.ObjectId, ref: 'Hostel' }
});
RoomSchema.plugin(autopopulate);

module.exports = mongoose.model('Room', RoomSchema);