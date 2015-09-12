'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('OHM', {
        url: '/OHM',
        templateUrl: 'app/hospiPortal/OHM/OHM.html',
        controller: 'OHMCtrl'
      });
  });