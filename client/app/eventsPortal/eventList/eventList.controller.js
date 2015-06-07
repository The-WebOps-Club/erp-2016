'use strict';

angular.module('erp2015App')
  .controller('EventsPortalEventListCtrl', function ($scope, EventsPortalService, $state, $http, $mdDialog) {
    EventsPortalService.getAllEventLists()
    	.then(function (allEventLists) {
    		$scope.allEventLists = allEventLists;
            console.log(allEventLists);
    	});
    $scope.eventsShow = false;

	$scope.eventListEditModal = function (eventList) {
    	$mdDialog.show({
    		controller: eventListEditModalCtrl,
    		templateUrl: '/app/eventsPortal/eventList/eventListEditModal.tmpl.html',
    		locals: {
    			eventListPassed: eventList
    		}
    	})
    	.then(function (response) {
    		console.log(response);
    	}, function () {
    		console.log('Cancel editing deal');
    	});
    };		

    function eventListEditModalCtrl($scope, $mdDialog, eventListPassed) {	
    	console.log(eventListPassed);
    	$scope.editEventList = eventListPassed;
    	
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.save = function () {
            // do the saving part here

            EventsPortalService.editEventList({
                _id: $scope.editEventList._id,
                title: $scope.editEventList.title,
                info: $scope.editEventList.info
            })
            .then(function (data) {
                $state.go('eventList');
            });

			$mdDialog.hide('Save edited deal');
		};    	
    }

    $scope.getEvents = function (eventList) {
        EventsPortalService.getEvents({
            _id: eventList._id
        })
        .then(function (data){
            $scope.events = data;
        });
        //$scope.events = eventList.events;
        console.log(eventList);
        $scope.eventsShow = true;
    };      

});
