'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('coordPortalDashboard', {
        url: '/coordPortal/dashboard',
        templateUrl: 'app/coordPortal/dashboard/dashboard.html',
        controller: 'CoordPortalDashboardCtrl',
        authenticate: true,
        data: {
          permissions: {
              only: ['admin', 'user'],
              redirectTo: 'coordPortalEditProfile'
          }        
        }                
      })
      .state('coordPortalCores', {
        url: '/coordPortal/admin',
        templateUrl: 'app/coordPortal/cores/cores.html',
        controller: 'CoordPortalCoresCtrl',
        authenticate: true,
        data: {
          permissions: {
              only: ['admin', 'core'],
              redirectTo: 'coordPortalEditProfile'
          }        
        }                
      })
      .state('coordPortalResponses', {
        url: '/coordPortal/admin/submissions/:id',
        templateUrl: 'app/coordPortal/cores/responses.html',
        controller: 'CoordPortalResponsesCtrl',
        authenticate: true,
        data: {
          permissions: {
              only: ['admin', 'core'],
              redirectTo: 'coordPortalEditProfile'
          }        
        }                
      })
      .state('coordPortalResponseDetails', {
        url: '/coordPortal/admin/application/:id',
        templateUrl: 'app/coordPortal/cores/responseDetails.html',
        controller: 'CoordPortalResponseDetailsCtrl',
        authenticate: true,
        data: {
          permissions: {
              only: ['admin', 'core'],
              redirectTo: 'coordPortalEditProfile'
          }        
        }                      
      })
      .state('coordPortalEditProfile', {
        url: '/coordPortal/editProfile',
        templateUrl: 'app/coordPortal/editProfile/editProfile.html',
        controller: 'CoordPortalEditProfileCtrl',
        authenticate: true
      });      
  });