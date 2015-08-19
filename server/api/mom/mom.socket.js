/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Mom = require('./mom.model');

exports.register = function(socket) {
  Mom.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Mom.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('mom:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('mom:remove', doc);
}