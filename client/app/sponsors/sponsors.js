'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sponsors', {
        url: '/sponsors',
        templateUrl: 'app/sponsors/sponsors.html',
        controller: 'SponsorsCtrl'
      })
      .state('sponsor_add',{
        url:'/sponsors/add',
        templateUrl: 'app/sponsors/sponsor_add.html',
        controller: 'SponsorAddCtrl'
      });
  });
