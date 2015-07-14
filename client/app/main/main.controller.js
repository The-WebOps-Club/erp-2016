'use strict';

angular.module('erp2015App')
  .controller('MainCtrl', function ($scope, $state, $http, socket) {

    $state.go('coordPortalDashboard');
    $scope.awesomeThings = [];

    // $http.get('/api/posts/newsfeed/1').success(function (data) {
    //   $scope.posts = data;
    // })
    
  });
