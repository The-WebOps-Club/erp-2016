'use strict';

angular.module('erp2015App')
  // .controller('CoordPortalDashboardCtrl', function ($scope, $location, $http, CoordPortalService, Auth, FileUploader) {
  .controller('CoordPortalCoresCtrl', function ($scope, $state, $location, $http, CoordPortalService, Auth) {

    $scope.getCurrentUser = Auth.getCurrentUser;
    if ($scope.getCurrentUser().role === 'user')
      $state.go('coordPortalDashboard');
    if (!$scope.getCurrentUser())
      $state.go('Login');

    $scope.responseDetails = 0;
    $scope.user = Auth.getCurrentUser();

    // making the process synchronous
    $scope.user.$promise.then(function () {
      $http.get('/api/departments/' + $scope.user.department[0] + '/')
        .success(function (response) {
          console.log(response);
          $scope.department = response;
        })
        .error(function (err) {
          console.log(err);
        });
        CoordPortalService.formByDepartment($scope.user.department[0]).then(function (forms) {
          if(forms.length !== 0) {
            $scope.forms = forms;
            console.log(forms);
            // socket.syncUpdates('form', $scope.allForms);
          } else {
            $scope.forms = '';
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
      $http.post('/api/subDepartments/', {name: $scope.newSubDepartment, department: $scope.department._id})
        .success(function (response) {
          $scope.message = "Added!"
          console.log(response);
        })
        .error(function (err) {
          console.log(err);
        });
    }
  });