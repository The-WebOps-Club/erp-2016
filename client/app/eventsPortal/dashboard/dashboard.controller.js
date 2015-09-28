'use strict';

angular.module('erp2015App')
  .controller('EventsPortalDashboardCtrl', function ($scope, EventsPortalService, $state, $http) {

  	$scope.eventsAssigned = [];
  	$http.get('/api/events/myEvents')
  		.then(function (response) {
  			$scope.eventsAssigned = response.data;
  		});

    $scope.gotoEvent = function (eventID) {
      // console.log(eventID);
      $state.go('event', { 'id': eventID });
    };

  });
