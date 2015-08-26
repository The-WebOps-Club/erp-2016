'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('webEvent', {
        url: '/web/event/:id',
        templateUrl: 'app/web/event/event.html',
        controller: 'webEventCtrl'
      })
  });