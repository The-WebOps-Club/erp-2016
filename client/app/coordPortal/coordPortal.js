'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('coordPortalDashboard', {
        url: '/coordPortal/dashboard',
        templateUrl: 'app/coordPortal/dashboard/dashboard.html',
        controller: 'CoordPortalDashboardCtrl',
      });
  });