/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Hostel = require('./hostel.model');

exports.register = function(socket) {
  Hostel.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Hostel.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('hostel:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('hostel:remove', doc);
}