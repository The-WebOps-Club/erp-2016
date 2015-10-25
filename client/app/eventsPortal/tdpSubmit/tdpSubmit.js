'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tdpSubmit', {
        url: '/eventsPortal/tdpSubmit',
        templateUrl: 'app/eventsPortal/tdpSubmit/tdpSubmit.html',
        controller: 'tdpSubmitCtrl'
      })
  });
