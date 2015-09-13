'use strict';

angular.module('erp2015App')
  .controller('TasksCtrl', function ($scope, $state,Task) {
    $state.go('newsfeed');
    $scope.tasks=Task.query();
    $scope.message = 'Hello';
  });
