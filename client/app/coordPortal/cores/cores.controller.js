'use strict';

angular.module('erp2015App')
  // .controller('CoordPortalDashboardCtrl', function ($scope, $location, $http, CoordPortalService, Auth, FileUploader) {
  .controller('CoordPortalCoresCtrl', function ($scope, $location, $http, CoordPortalService, Auth) {

    $scope.responseDetails = 0;
    $scope.user = Auth.getCurrentUser();
    $scope.user.$promise.then(function () {
      $http.get('/api/departments/' + $scope.user.department[0] + '/')
        .success(function (response) {
          console.log(response);
          $scope.department = response;
        })
        .error(function (err) {
          console.log(err);
        });
        CoordPortalService.formValuesAll($scope.user.department[0]).then(function (responses) {
          if(responses.length !== 0) {
            $scope.responses = responses;
            // console.log(responses);
            // socket.syncUpdates('form', $scope.allForms);
          } else {
            $scope.responses = '';
          }
        });
    })
    // console.log($scope.user.$promise);

    // loading all the forms applied in department

    $scope.showResponse = function (response) {
      console.log(response);
      $scope.response = response;
      $scope.responseDetails = 1;
    };
    $scope.emptyAlerts = function() {
      $scope.message = {};
    };

    $scope.updateResponse = function () {
      if (!response.status) response.status = "Pending";
      console.log(response);
    };

    $scope.addSubDepartment = function () {
      $http.post('/api/subDeparments/', {name: $scope.newSubDepartment, department: $scope.department._id})
        .success(function (response) {
          console.log(response);
        })
        .error(function (err) {
          console.log(err);
        });
    }
  });