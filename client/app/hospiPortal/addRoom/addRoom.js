'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('addRoom', {
        url: '/addRoom',
        templateUrl: 'app/hospiPortal/addRoom/addRoom.html',
        controller: 'AddRoomCtrl'
      });
  });