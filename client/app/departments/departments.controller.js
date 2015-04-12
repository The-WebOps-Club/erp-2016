'use strict';

angular.module('erp2015App')
  .controller('DepartmentsCtrl', function ($scope, $http) {
    $http.get('/api/departments')
      .success(function(data) {
        $scope.departments = data;
      })
      .error(function(err) {
        /*
        Do some error handling here
         */
        console.log(err);        
      });
    $scope.addSub = function() {
    	$http.post('/api/subDepartments', $scope.subDept)
        .success(function(data) {
          $scope.subDepartments = data;
        })
        .error(function(err) {
          /*
          Do some error handling here
           */
          console.log(err);
        });
    }
  });
