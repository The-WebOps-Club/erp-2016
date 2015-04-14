'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('newsfeed', {
        url: '/newsfeed',
        templateUrl: 'app/newsfeed/newsfeed.html',
        controller: 'NewsfeedCtrl'
      });
  });