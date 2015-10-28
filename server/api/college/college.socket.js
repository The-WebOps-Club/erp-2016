/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var College = require('./college.model');

exports.register = function(socket) {
  College.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  College.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('college:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('college:remove', doc);
}