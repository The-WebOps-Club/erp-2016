'use strict';

angular.module('erp2015App')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $state) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.profilePic = Auth.getCurrentUser().profilePic;
    $scope.logout = function() {
      Auth.logout();
      // $location.path('/login');
      $state.go('login');
      // $location.url('/login');
    };


    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
  app.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  });