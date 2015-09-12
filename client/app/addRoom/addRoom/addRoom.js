'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('addRoom', {
        url: '/addRoom',
        templateUrl: 'app/addRoom/addRoom/addRoom.html',
        controller: 'AddRoomCtrl'
      });
  });