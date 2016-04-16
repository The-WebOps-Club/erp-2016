'use strict';

angular.module('erp2015App')
  // .controller('CoordPortalDashboardCtrl', function ($scope, $location, $http, CoordPortalService, Auth, FileUploader) {
  .controller('CoordPortalCoresCtrl', function ($scope, $state, $location, $http, CoordPortalService, Auth) {

    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.department = $scope.getCurrentUser().department;
    $scope.files = '';

    CoordPortalService.getFilesFromDepartment($scope.department).then(function(files) {
      $scope.files = files;
      console.log($scope.files);
    });
    $scope.fileDownloadLink = "http://coordportal.shaastra.org:9000/api/imgs/" + $scope.department;

    if ($scope.getCurrentUser().role === 'user')
      $state.go('coordPortalDashboardCtrl');
    if (!$scope.getCurrentUser())
      $state.go('LoginCtrl');

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
            // console.log(forms);
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
          window.alert($scope.message);
          console.log(response);
          window.location.reload();
        })
        .error(function (err) {
          window.alert("Some error happened");
          console.log(err);
        });
    }
  });