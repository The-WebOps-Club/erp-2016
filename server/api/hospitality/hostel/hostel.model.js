'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
 var autopopulate= require('mongoose-autopopulate');

var HostelSchema = new Schema({
  name: String,
  info: String,

 
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }]

});
HostelSchema.plugin(autopopulate);

module.exports = mongoose.model('Hostel', HostelSchema);