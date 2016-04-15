'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('formsCreate', {
        url: '/forms/formCreate',
        templateUrl: 'app/forms/formCreate/formCreate.html',
        controller: 'FormCreateCtrl',
        // data: {
        //   permissions: {
        //     only: ['admin', 'core'],
        //     redirectTo: 'coordPortalDashboard'
        //   }
        // }                
      })
      .state('formsView', {
        url: '/forms/formView/:fullName',
        templateUrl: 'app/forms/formView/formView.html',
        controller: 'FormViewCtrl',
        // data: {
        //   permissions: {
        //     except: ['anonymous'],
        //     redirectTo: 'coordPortalDashboard'
        //   }
        // }                
      });
  });