'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      /*
      State 'wall' must show ----complete it----
       */
      .state('wall', {
        url: '/wall/{type}?dept&subDept&id',
        templateUrl: 'app/wall/wall.html',
        controller: 'WallCtrl'
      });
  });