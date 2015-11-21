'use strict';

angular.module('erp2015App')
  .controller('AccStatusCtrl', function ($scope,$state) {
    $scope.message = 'Hello';
    $scope.click=function(value){
    	$state.go(value);
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
        name: "tam to win",
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
     var i=0;
    $scope.cteams=0; $scope.cparticipants=0; $scope.cmale=0; $scope.cfemale=0;
    $scope.wteams=0; $scope.wparticipants=0; $scope.wmale=0; $scope.wfemale=0;
    $scope.rteams=0; $scope.rparticipants=0; $scope.rmale=0; $scope.rfemale=0;
    $scope.pteams=0; $scope.pparticipants=0; $scope.pmale=0; $scope.pfemale=0;
    $scope.tteams=0; $scope.tparticipants=0; $scope.tmale=0; $scope.tfemale=0;
    

    for(i=0;$scope.teams[i];i++){
      
      if($scope.teams[i].accStatus=="Confirmed"){
     	console.log($scope.teams[i].number+1);
     	//$scope.cparticipants+=$scope.teams[i].number;
     	console.log(parseInt($scope.cparticipants));
      	$scope.cteams++; $scope.cparticipants+=$scope.teams[i].number; $scope.cmale+=$scope.teams[i].male; $scope.cfemale+=$scope.teams[i].female;
      }
      if($scope.teams[i].accStatus=='Wait Listed'){
      	$scope.wteams++; $scope.wparticipants+=$scope.teams[i].number; $scope.wmale+=$scope.teams[i].male; $scope.wfemale+=$scope.teams[i].female;
      }
      if($scope.teams[i].accStatus=='Pending'){
      	$scope.pteams++; $scope.pparticipants+=$scope.teams[i].number; $scope.pmale+=$scope.teams[i].male; $scope.pfemale+=$scope.teams[i].female;
      }
      if($scope.teams[i].accStatus=='Rejected'){

      	$scope.rteams++; $scope.rparticipants+=$scope.teams[i].number; $scope.rmale+=$scope.teams[i].male; $scope.rfemale+=$scope.teams[i].female;
      }
      if($scope.teams[i].accStatus!='Not Required'){
      $scope.tteams++; $scope.tparticipants+=$scope.teams[i].number; $scope.tmale+=$scope.teams[i].male; $scope.tfemale+=$scope.teams[i].female;
      }
    }
  });
