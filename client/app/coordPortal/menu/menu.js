'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('coordPortalMenu', {
        url: '/coordPortal/menu',
        templateUrl: 'app/coordPortal/menu/menu.html',
        controller: 'CoordPortalMenuCtrl',
      });
  });