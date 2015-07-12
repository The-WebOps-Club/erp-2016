/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Wall = require('./wall.model');

exports.register = function(socket) {
  Wall.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Wall.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('wall:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('wall:remove', doc);
}