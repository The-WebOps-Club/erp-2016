'use strict';

angular.module('erp2015App')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $state, $http, socket) {
    $scope.notifPage = 1;
    $scope.notifications = [];
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    // $scope.load=function(){
    //   $scope.notifPage=$scope.notifPage+1;
    //   $http.get('/api/notifications/page/'+$scope.notifPage)
    //     .success(function(notifications) {
    //       $scope.notifications=$scope.notifications.concat(notifications);
    //       socket.syncUpdates('post', $scope.notifications);
    //     })
    //     .error(function(err) {
    //       console.log(err);
    //     });
    // }

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
    $(document).ready(function()
    {
      $("#notification_li").click(function()
    {
      $("#notificationContainer").fadeToggle(300);
    return false;
    });

    //Document Click hiding the popup 
    $(document).click(function()
    {
      $("#notificationContainer").hide();
    });

    //Popup on click
    $("#notificationContainer").click(function()
    {
      return false;
    });

    });
  });