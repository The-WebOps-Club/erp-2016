/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var MarqueeNotif = require('./marqueeNotif.model');

exports.register = function(socket) {
  MarqueeNotif.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  MarqueeNotif.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('marqueeNotif:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('marqueeNotif:remove', doc);
}