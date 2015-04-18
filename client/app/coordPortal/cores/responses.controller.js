'use strict';

angular.module('erp2015App')
  // .controller('CoordPortalDashboardCtrl', function ($scope, $location, $http, CoordPortalService, Auth, FileUploader) {
  .controller('CoordPortalResponsesCtrl', function ($scope, $location, $stateParams, $http, CoordPortalService, Auth) {
    
    $scope.getCurrentUser = Auth.getCurrentUser;
    if ($scope.getCurrentUser().role === 'user')
      $state.go('coordPortalCoresCtrl');
    if (!$scope.getCurrentUser())
      $state.go('LoginCtrl');

    $scope.responseDetails = 0;
    $scope.user = Auth.getCurrentUser();

    CoordPortalService.formResponses($stateParams.id)
      .then(function (data) {
        console.log(data);
        $scope.responses = data;
      });
    // console.log($scope.user.$promise);
  });