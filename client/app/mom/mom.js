'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('mom', {
        url: '/mom',
        templateUrl: 'app/mom/mom.html',
        controller: 'MomCtrl',
        authenticate: true,
        data: {
          permissions: {
              only: [],
              redirectTo: 'login'
          }
        }
      });
  });