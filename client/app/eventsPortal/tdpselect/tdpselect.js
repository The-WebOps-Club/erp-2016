'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tdpselect', {
        url: '/eventsPortal/tdpselect/:id',
        templateUrl: 'app/eventsPortal/tdpselect/tdpselect.html',
        controller: 'TdpselectCtrl'
      });
  });