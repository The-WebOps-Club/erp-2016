'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tdpCreation', {
        url: '/eventsPortal/tdpCreation',
        templateUrl: 'app/eventsPortal/tdpCreation/tdpCreation.html',
        controller: 'TdpCreationCtrl'
      });
  });