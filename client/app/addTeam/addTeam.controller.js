'use strict';

angular.module('erp2015App')
  .controller('AddTeamCtrl', function ($scope) {

   $scope.user={};

   $scope.validate=function(form){
   	$scope.submitted="true";
    };
    
  });
