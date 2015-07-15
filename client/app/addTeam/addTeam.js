'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('addTeam', {
        url: '/addTeam',
        templateUrl: 'app/addTeam/addTeam.html',
        controller: 'AddTeamCtrl'
      });
  });