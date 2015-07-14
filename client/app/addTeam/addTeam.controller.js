'use strict';

angular.module('erp2015App')
  .controller('AddTeamCtrl', function ($scope,$http,$filter) {

   $scope.user={};

   $scope.searchName = function (input) {
   	 $scope.names = $filter('filter')($scope.users,{name:input}); 
   	 $scope.inputName=input;
   }
   
   $scope.searchDept = function (input) {
   	 $scope.depts = $filter('filter')($scope.departments,{name:input}); 
   	 $scope.inputDept=input;
   }

   $http.get('/api/users/').
   success(function(data, status, headers, config){
   	$scope.users = data;
   }).
   error(function(data, status, headers, config){
   	console.log("error");
   });
   
   $http.get('/api/departments/').
   success(function(data, status, headers, config){
   	$scope.departments = data;
   }).
   error(function(data, status, headers, config){
   	console.log("error");
   });

   $scope.validate=function(form){
   	$scope.submitted="true";
    };
    
  });
