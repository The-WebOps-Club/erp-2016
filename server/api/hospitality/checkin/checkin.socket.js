/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Checkin = require('./checkin.model');

exports.register = function(socket) {
  Checkin.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Checkin.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('checkin:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('checkin:remove', doc);
}