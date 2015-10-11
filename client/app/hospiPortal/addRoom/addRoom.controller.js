'use strict';

angular.module('erp2015App')
  .controller('AddRoomCtrl', function ($scope,$state) {
    $scope.message = 'Hello';
    $scope.hostel={};
    $scope.room={};
    $scope.click=function(value){
    	$state.go(value);
    }
    $scope.hostels=["Sarawati","Mahanadhi","Pampa"];
    $scope.types=['male','female'];
    $scope.hostel.type='male';
	$scope.room.hostel=$scope.hostels[0]; 
	
});

