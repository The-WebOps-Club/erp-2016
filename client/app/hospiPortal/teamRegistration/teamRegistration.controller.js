'use strict';

angular.module('erp2015App')
  .controller('TeamRegistrationCtrl', function ($scope,$state,$mdDialog,$mdDatePicker,$log,$timeout,$q) {
    $scope.message = 'Hello';
    $scope.team={};
    $scope.team.acc='Select Accomodation Status';
    $scope.click=function(value){
    	console.log(value);
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




   
   
    $scope.func=function(value){
       
        if(value=="Confirmed"){
            return 1;
        }
        else
            return 0;
    }
    $scope.funcr=function(value){
       
        if(value=="Rejected"){
            return 1;
        }
        else
            return 0;
    }
    $scope.funcb=function(value){
       
        if(value=="Pending"){
            return 1;
        }
        else
            return 0;
    }
    $scope.funcg=function(value){
       
        if(value=="Not Required"){
            return 1;
        }
        else
            return 0;
    }
    $scope.funca=function(value){
       
        if(value=="Wait Listed"){
            return 1;
        }
        else
            return 0;
    }


    $scope.close=function(){
        $mdDialog.cancel()
    }
   
    $scope.teams=[{
        name: "aBirds",
        accStatus: "Rejected",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Death Birds",
        accStatus: "Pending",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Goat Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Boat Birds",
        accStatus: "Not Required",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Kites",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Mighty Boys",
        accStatus: "Wait Listed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Looses",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Masses",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Nights",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Eagles",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Vultures",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Kings",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Young ",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Flamingos",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Black",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "white",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Note Book",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "ghju",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "jack",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 10,
        teamId: "SA162020"
    },
    {
        name: "team to win",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "winners",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 28,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Difficult",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Easy",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Karthik",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 33,
        male: 2,
        female: 1,
        teamId: "SA162890"
    },
    {
        name: "Am a tree",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Jokes",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 31,
        male: 21,
        female: 1,
        teamId: "SA162070"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 21,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 11,
        teamId: "SA162920"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 31,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA168920"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162720"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162001"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162110"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162000"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162890"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA161110"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    },
    {
        name: "Flying Birds",
        accStatus: "Confirmed",
        checkin: new Date(),
        checkout: new Date(),
        mobile: "9445401255",
        number: 3,
        male: 2,
        female: 1,
        teamId: "SA162020"
    }
    ];
/*
    $scope.teams.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    
*/  
    
    $scope.counter=0;
    $scope.countern=0;
    $scope.counterm=0;
    $scope.counterf=0;
    $scope.counters=0;
    $scope.counterI=0;
    $scope.sort=function(){
       
       
       $scope.counter++;
       if(  $scope.counter%2==1){
        $scope.teams.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
   
        }); 
       }
       if($scope.counter%2==0){

        $scope.teams.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;

        }); 
       }
     


    };
    $scope.sorts=function(){
       
       
       $scope.counters++;
       if(  $scope.counters%2==1){
        $scope.teams.sort(function(a, b) {
            var textA = a.accStatus.toUpperCase();
            var textB = b.accStatus.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
   
        }); 
       }
       if($scope.counters%2==0){

        $scope.teams.sort(function(a, b) {
            var textA = a.accStatus.toUpperCase();
            var textB = b.accStatus.toUpperCase();
            return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;

        }); 
       }
     


    };
   $scope.sortI=function(){
       
       
       $scope.counterI++;
       if(  $scope.counterI%2==1){
        $scope.teams.sort(function(a, b) {
            var textA = a.teamId.toUpperCase();
            var textB = b.teamId.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
   
        }); 
       }
       if($scope.counterI%2==0){

        $scope.teams.sort(function(a, b) {
            var textA = a.teamId.toUpperCase();
            var textB = b.teamId.toUpperCase();
            return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;

        }); 
       }
     


    }
   

    $scope.sortn=function(){
      
       $scope.countern++;
       if($scope.countern%2==1){
        $scope.teams.sort(function(a, b) {
            
            return a.number-b.number;
        }); 
       }
       if($scope.countern%2==0){
        $scope.teams.sort(function(a, b) {
           
            return b.number-a.number;
        }); 
       }
       


    };
   
     

    
    $scope.sortf=function(){
       
       
       $scope.counterf++;
       if($scope.counterf%2==1){
        $scope.teams.sort(function(a, b) {
            
            return a.female-b.female;
        }); 
       }
       if($scope.counterf%2==0){
        $scope.teams.sort(function(a, b) {
           
            return b.female-a.female;
        }); 
       }
       

    };
    $scope.sortm=function(){
       console.log($scope.counterm);
       
       $scope.counterm++;
       if($scope.counterm%2==1){
        $scope.teams.sort(function(a, b) {
            
            return a.male-b.male;
        }); 
       }
       if( $scope.counterm%2==0){
        $scope.teams.sort(function(a, b) {
           
            return b.male-a.male;
        }); 
       }
       

    };

    
    // list of `state` value/display objects
   
    $scope.querySearched   = querySearched;
    $scope.selectedTeamChange = selectedTeamChange;
    $scope.searchedTextChange   = searchedTextChange;
    function searchedTextChange(text) {
      $log.info('Text changed to ' + text);
    }
    function selectedTeamChange(team) {
      $log.info('Item changed to ' + JSON.stringify(team));
    }
    function querySearched (query) {
      var results = query ? $scope.teams.filter( createdFilterFor(query) ) : $scope.teams,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
     function createdFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(team) {
        var lowercase=angular.lowercase(team.name);
        var lowerId=angular.lowercase(team.teamId);
        return (lowercase.indexOf(lowercaseQuery) === 0 || lowerId.indexOf(lowercaseQuery)=== 0);
      };
    
   }
  });
