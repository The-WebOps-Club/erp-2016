'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('teamRegistration', {
        url: '/teamRegistration',
        templateUrl: 'app/hospiPortal/teamRegistration/teamRegistration.html',
        controller: 'TeamRegistrationCtrl'
      });
  });