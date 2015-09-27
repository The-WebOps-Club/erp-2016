'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TdpformSchema = new Schema({
  event: { type: Schema.Types.ObjectId, ref: 'Event' },
  questions: Object,
  responses: [{type: Schema.Types.ObjectId, ref: 'Tdpresponse'}]
});

module.exports = mongoose.model('Tdpform', TdpformSchema);