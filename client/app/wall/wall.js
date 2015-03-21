'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('wall', {
        url: '/wall',
        templateUrl: 'app/wall/wall.html',
        controller: 'WallCtrl'
      });
  });