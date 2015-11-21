'use strict';

angular.module('erp2015App')
  .controller('FinanceSaarangCtrl', function ($scope,$mdDatePicker) {

    
    $scope.selectedFilter1='Select Your Type';
    $scope.selectedFilter2='Your Department';
    $scope.selectedFilter3='Select Category';
    $scope.types=['Reimbursement','Settling Advance','Advance Request'];
    $scope.depts=['Culs and Secs','Design and Media','Events','Faclties','Hospitality','Marketing and Ticket sales','Professional Shows','Publicity','QMS','Security','Sponsorship and PR','Web Operations'];
    $scope.categories=['Material','Printing/Xerox','Refreshments','Travel','Other'];
    $scope.bool=1;
    $scope.typeRed=1;
    $scope.departmentRed=1;
    $scope.designationRed=1;
    $scope.dateRed=1;
    $scope.categoryRed=1;
    $scope.amountRed=1;
    $scope.cotherRed=1;
    $scope.invoiceRed=1;
    $scope.purposeRed=1;
    $scope.fin={};
    
    $scope.fun=function(value){
    	console.log(value);
    	$scope.selectedFilter1=value;
    	console.log($scope.selectedFilter1);
    }
    $scope.func=function(value){
    	console.log(value);
    	$scope.selectedFilter2=value;
    	console.log($scope.selectedFilter2);
    }
    $scope.funct=function(value){
    	console.log(value);
    	$scope.selectedFilter3=value;
    	console.log($scope.selectedFilter2);
    	if(value=='Other') { $scope.bool=0; }
    	else { $scope.bool=1; $scope.fin.categoryOther="";}
    }
	$scope.showPicker = function(ev) {
	$mdDatePicker(ev, $scope.currentDate).then(function(selectedDate) {
	$scope.currentDate = selectedDate;
      });;
    } 

    $scope.sub=function(){
    	
        // $scope.fin.date=$scope.currentDate;
        // if(!$scope.fin.type){ $scope.typeRed=0;}
        // if(!$scope.fin.department){ $scope.departmentRed=0;}
        // if($scope.fin.designation.$error.required){ $scope.designationRed=0}
        // if(!$scope.fin.date){ $scope.dateRed=0;}
        // if(!$scope.fin.category){ $scope.categoryRed=0;}
        // if(!$scope.fin.invoice){ $scope.invoiceRed=0;}
        // if(!$scope.fin.purpose){ $scope.purposeRed=0;}
        // if($scope.fin.category=='Other' && !$scope.fin.categoryOther){ $scope.cotherRed=0;}
    	
    }
  });
