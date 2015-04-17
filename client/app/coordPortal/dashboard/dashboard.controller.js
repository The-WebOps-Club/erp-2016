'use strict';

angular.module('erp2015App')
  // .controller('CoordPortalDashboardCtrl', function ($scope, $location, $http, CoordPortalService, Auth, FileUploader) {
  .controller('CoordPortalDashboardCtrl', function ($scope, $location, $http, CoordPortalService, Auth) {

    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.allForms = '';
    $scope.preference = '';
    $scope.form = {};
    $scope.message = {};

    CoordPortalService.options().then(function (responses) {
      if(responses.length !== 0) {
        $scope.allForms = responses;
      } else {
        $scope.allForms = '';
      }
    });

    // loading all the forms applied by user
    CoordPortalService.formsApplied().then(function (responses) {
      if(responses.length !== 0) {
        $scope.formsApplied = responses;
        console.log(responses);
      } else {
        $scope.formsApplied = '';
      }
    });

    // delete the application to a form
    $scope.deleteApp = function(id) {
      console.log(id);
      $http.post('/api/coordForms/deleteApp', { formId: id })
        .success(function (response) {
          console.log(response);
        })
        .error(function (err) {
          console.log(err);
        });
    };

    $scope.emptyAlerts = function() {
      $scope.message = {};
    };
  });
