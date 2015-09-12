'use strict';

angular.module('erp2015App')
  .controller('TeamRegistrationCtrl', function ($scope,$state,$mdDialog,$mdDatePicker) {
    $scope.message = 'Hello';
    $scope.team={};
    $scope.click=function(value){
    	$state.go(value);
    }
    $scope.dialog=function(ev){
    	$mdDialog.show({
 			controller: 'TeamRegistrationCtrl',
 			templateUrl: 'app/hospiPortal/teamRegistration/teamForm.html',
 			parent: angular.element(document.body),
      		targetEvent: ev,
      		clickOutsideToClose:false
    	})


    }
    $scope.acc="Select Accomodation Status";
    $scope.accs=['Accomodation Not Required', 'Accomodation Requested','Request Confirmed','Rejected','Wait Listed','Added To Hospi Portal'];
    $scope.func=function(value){
    	$scope.acc=value;
    };

    $scope.myDate=new Date();
    $scope.showPicker = function(ev) {
	$mdDatePicker(ev, $scope.currentDate).then(function(selectedDate) {
	$scope.team.dateOfArrival = selectedDate;
      });;
    } 

  });
