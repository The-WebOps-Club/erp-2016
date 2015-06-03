'use strict';

angular.module('erp2015App')
  .controller('EventsPortalCoresCtrl', function ($scope, EventsPortalService, $state, $http) {
    $scope.submitted = false;
   
   	$scope.newEventList = function(form) {
    	$scope.submitted = true;
    	if(form.$valid) {
      		EventsPortalService.createEventList({
        		title: $scope.eventList.title,
        		info: $scope.eventList.info
      		})
      		.then(function (data) {
            	$state.go('eventList');
      		})
      		.catch(function (err) {
        		err = err.data;
        		$scope.errors = {};

        		// Update validity of form fields that match the mongoose errors
        		angular.forEach(err.errors, function (error, field) {
          			form[field].$setValidity('mongoose', false);
          			$scope.errors[field] = error.message;
        		});
      		});
    	}
  	};
});
