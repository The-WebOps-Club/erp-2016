'use strict';

angular.module('erp2015App')
  .controller('TeamRegistrationCtrl', function ($scope,$state,$mdDialog,$mdDatePicker) {
    $scope.message = 'Hello';
    $scope.team={};
    $scope.team.acc='Select Accomodation Status';
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
    
    $scope.accs=['Accomodation Not Required', 'Accomodation Requested','Request Confirmed','Rejected','Wait Listed','Added To Hospi Portal'];
    

    $scope.minDate=new Date(2016,0,6);
    $scope.maxDate=new Date(2016,0,11);
    

  });
