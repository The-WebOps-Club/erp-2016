'use strict';

angular.module('erp2015App')
  // .controller('CoordPortalDashboardCtrl', function ($scope, $location, $http, CoordPortalService, Auth, FileUploader) {
  .controller('CoordPortalCoresCtrl', function ($scope, $location, $http, CoordPortalService, Auth) {

    $scope.responseDetails = 0;
    $scope.user = Auth.getCurrentUser();

    // loading all the forms applied in department
    CoordPortalService.formValuesAll(Auth.getCurrentUser().department[0]).then(function (responses) {
      if(responses.length !== 0) {
        $scope.responses = responses;
        // console.log(responses);
        // socket.syncUpdates('form', $scope.allForms);
      } else {
        $scope.responses = '';
      }
    });

    $scope.showResponse = function (response) {
      console.log(response);
      $scope.response = response;
      $scope.responseDetails = 1;
    }
    $scope.emptyAlerts = function() {
      $scope.message = {};
    };
  });
