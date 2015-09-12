'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('roomMap', {
        url: '/roomMap',
        templateUrl: 'app/hospiPortal/roomMap/roomMap.html',
        controller: 'RoomMapCtrl'
      });
  });