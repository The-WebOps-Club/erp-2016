'use strict';

angular.module('erp2015App')
  .controller('TeamRegistrationCtrl', function ($scope,$state,$mdDialog,$mdDatePicker,$log,$timeout,$q) {
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
    $scope.team.acc='Accomodation Not Required';
    $scope.team.timeOfArrivalMin='00';
    $scope.team.timeOfArrivalHour='00';
    $scope.team.timeOfDepartureMin='00';
    $scope.team.timeOfDepartureHour='00';
    $scope.team.dateOfArrival=new Date(2016,0,6);
    $scope.team.dateOfDeparture=new Date(2016,0,6);
    $scope.accs=['Accomodation Not Required', 'Accomodation Requested','Request Confirmed','Rejected','Wait Listed','Added To Hospi Portal'];
    $scope.mins=['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37',
    '38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'];
    $scope.hours=['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];

    $scope.minDate=new Date(2016,0,6);
    $scope.maxDate=new Date(2016,0,11);





   
    // list of `state` value/display objects
    $scope.teamIds       = ['SA160000','SA160001','SA160020','SA160021','SA163000','SA164000','SA164500','SA164670','SA161020','SA162020','sa160001'];
    $scope.querySearch   = querySearch;
    $scope.selectedItemChange = function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    };
    $scope.searchTextChange   =  function selectedItemChange(item) {
      $log.info('Item changed to ' + item);
    };

    function querySearch (query) {
      var results = query ? $scope.teamIds.filter( createFilterFor(query) ) : $scope.teamIds,
          deferred;
      if ($scope.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function createFilterFor(query) {
      var lowercaseQuery = query;
      return function filterFn(teamId) {
        return (teamId.indexOf(lowercaseQuery) === 0);
      };
    }
   
   
  
    

  });
