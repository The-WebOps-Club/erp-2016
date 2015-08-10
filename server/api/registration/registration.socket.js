/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Registration = require('./registration.model');

exports.register = function(socket) {
  Registration.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Registration.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('registration:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('registration:remove', doc);
}