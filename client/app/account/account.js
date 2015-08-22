'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl',
        authenticate: true,
        data: {
          permissions: {
              only: ['anonymous'],
              redirectTo: 'newsfeed'
          }
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .state('forgotPassword', {
        url: '/forgotPassword',
        templateUrl: 'app/account/password/forgotPassword.html',
        controller: 'ForgotPasswordCtrl'
      })
      .state('resetPassword', {
        url: '/resetPassword/:token',
        templateUrl: 'app/account/password/resetPassword.html',
        controller: 'ResetPasswordCtrl'
      })
      .state('editProfile', {
        url: '/editProfile',
        templateUrl: 'app/account/editProfile/editProfile.html',
        controller: 'editProfileCtrl',
        data: {
          permissions: {
              only: ['user','admin','core'],
              except: ['anonymous'],
              redirectTo: 'login'
          }        
        }                
      });                  
  });