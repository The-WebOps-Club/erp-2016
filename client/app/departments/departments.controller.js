'use strict';

angular.module('erp2015App')
  .controller('DepartmentsCtrl', function ($scope, $http,$state) {
    //walling 'em out

    $scope.searchName = function (input) {
      $scope.names = $filter('filter')($scope.users,{name:input}); 
      $scope.inputName=input;
    }

     $http.get('/api/users/').
     success(function(data, status, headers, config){
      $scope.users = data;
     }).
     error(function(data, status, headers, config){
      console.log("error");
     });
   
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
