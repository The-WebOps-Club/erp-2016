'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('formsCreate', {
        url: '/forms/formCreate',
        templateUrl: 'app/forms/formCreate/formCreate.html',
        controller: 'FormCreateCtrl',
        data: {
          permissions: {
            only: [],
            redirectTo: 'newsfeed'
          }
        }                
      })
      .state('formsView', {
        url: '/forms/formView/:id',
        templateUrl: 'app/forms/formView/formView.html',
        controller: 'FormViewCtrl',
        data: {
          permissions: {
            except: [],
            redirectTo: 'newsfeed'
          }
        }                
      });
  });