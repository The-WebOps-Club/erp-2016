/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    city: 'testCity',
    summerLocation: 'testSummer',
    cgpa: '5',
    phoneNumber: '5555555555',
    rollNumber: 'tttttttt',
    roomNumber: '111',
    hostel: {
              name : 'Narmada',
              value : 'narmada'
            }
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin',
    city: 'adminCity',
    summerLocation: 'adminSummer',
    cgpa: '10',
    phoneNumber: '9999999999',
    rollNumber: 'aaaaaaaa',
    roomNumber: '222',
    hostel: {
              name : 'Narmada',
              value : 'narmada'
            }    
  },
  {
    provider: 'local',
    role: 'core',
    name: 'core1',
    email: 'core1@core.com',
    password: 'core',
    city: 'core1City',
    summerLocation: 'core1Summer',
    cgpa: '10',
    phoneNumber: '9999999999',
    rollNumber: 'aaaaaaaa',
    roomNumber: '222',
    hostel: {
              name : 'Narmada',
              value : 'narmada'
            }    
  },
  {
    provider: 'local',
    role: 'core',
    name: 'core2',
    email: 'core2@core.com',
    password: 'core',
    city: 'core2City',
    summerLocation: 'core2Summer',
    cgpa: '10',
    phoneNumber: '9999999999',
    rollNumber: 'aaaaaaaa',
    roomNumber: '222',
    hostel: {
              name : 'Narmada',
              value : 'narmada'
            }    
},
{
    provider: 'local',
    role: 'coord',
    name: 'coord1',
    email: 'coord1@coord.com',
    password: 'coord',
    city: 'coord1City',
    summerLocation: 'coord1Summer',
    cgpa: '10',
    phoneNumber: '9999999999',
    rollNumber: 'aaaaaaaa',
    roomNumber: '222',
    hostel: {
              name : 'Narmada',
              value : 'narmada'
            }    
},
{
    provider: 'local',
    role: 'coord',
    name: 'coord2',
    email: 'coord2@coord.com',
    password: 'coord',
    city: 'coord2City',
    summerLocation: 'coord2Summer',
    cgpa: '10',
    phoneNumber: '9999999999',
    rollNumber: 'aaaaaaaa',
    roomNumber: '222',
    hostel: {
              name : 'Narmada',
              value : 'narmada'
            }    
},
{
    provider: 'local',
    role: 'coord',
    name: 'coord3',
    email: 'coord3@coord.com',
    password: 'coord',
    city: 'coord3City',
    summerLocation: 'coord3Summer',
    cgpa: '10',
    phoneNumber: '9999999999',
    rollNumber: 'aaaaaaaa',
    roomNumber: '222',
    hostel: {
              name : 'Narmada',
              value : 'narmada'
            }    
},
   function() {
      console.log('finished populating users');
    }
  );
});