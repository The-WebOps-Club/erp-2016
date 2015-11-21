'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('accStatus', {
        url: '/accStatus',
        templateUrl: 'app/hospiPortal/accStatus/accStatus.html',
        controller: 'AccStatusCtrl'
      });
  });