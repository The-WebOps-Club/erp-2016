/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var WebsiteUsers = require('./websiteUsers.model');

exports.register = function(socket) {
  WebsiteUsers.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  WebsiteUsers.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('websiteUsers:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('websiteUsers:remove', doc);
}