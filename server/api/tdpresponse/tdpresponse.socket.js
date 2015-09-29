/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Tdpresponse = require('./tdpresponse.model');

exports.register = function(socket) {
  Tdpresponse.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Tdpresponse.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('tdpresponse:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('tdpresponse:remove', doc);
}