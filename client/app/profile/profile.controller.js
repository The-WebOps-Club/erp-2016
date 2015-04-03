'use strict';

angular.module('erp2015App')
  .controller('ProfileCtrl', function ($scope, $http, Auth) {
    $scope.user = Auth.getCurrentUser();
    $scope.message = 'Hello ' + $scope.user.name;
  });
