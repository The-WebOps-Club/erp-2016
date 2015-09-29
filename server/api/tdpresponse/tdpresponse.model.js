'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TdpresponseSchema = new Schema({
  tdpform: { type: Schema.Types.ObjectId, ref: 'Tdpform' },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  response: Object,
  isSelected: { type: Boolean, default: false },
  fileID: String,
  fileExtension: String
});

module.exports = mongoose.model('Tdpresponse', TdpresponseSchema);