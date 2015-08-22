/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/hospitality/checkins', require('./api/hospitality/checkin'));
  app.use('/api/hospitality/rooms', require('./api/hospitality/room'));
  app.use('/api/hospitality/hostels', require('./api/hospitality/hostel'));
  app.use('/api/groups', require('./api/group'));
  app.use('/api/walls', require('./api/wall'));
  app.use('/api/notifications', require('./api/notification'));
  app.use('/api/comments', require('./api/comment'));
  app.use('/api/uploads', require('./api/upload'));
  app.use('/api/forms', require('./api/form'));
  app.use('/api/coordForms', require('./api/coordForm'));
  app.use('/api/subDepartments', require('./api/subDepartment'));
  app.use('/api/posts', require('./api/post'));
  app.use('/api/departments', require('./api/department'));
  app.use('/api/tasks', require('./api/task'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      // console.log(app.get('appPath'));
      // res.sendfile(app.get('appPath') + '/index.html');
      res.sendFile('index.html', { root: app.get('appPath') });
    });
};
