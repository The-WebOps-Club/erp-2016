'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('financeAdmin', {
        url: '/finance/admin',
        templateUrl: 'app/financePortal/admin/admin.html',
        controller: 'FinanceAdminCtrl'
      }).state('financeClubs', {
        url: '/finance/clubs',
        templateUrl: 'app/financePortal/clubs/clubs/clubs.html',
        controller: 'FinanceClubsCtrl'
      }).state('financeSaarang', {
        url: '/finance/saarang',
        templateUrl: 'app/financePortal/saarang/saarang/saarang.html',
        controller: 'FinanceSaarangCtrl'
      });
  });