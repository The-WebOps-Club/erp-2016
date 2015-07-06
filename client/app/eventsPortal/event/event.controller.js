'use strict';

angular.module('erp2015App')
  .controller('EventsPortalEventCtrl', function ($state,$scope,$http,EventsPortalService,$mdDialog,$location) {
    
    var id = location.pathname.split('/')[3];
 	EventsPortalService.getEvent(id).then(function (event){
 		$scope.event = event;
 		$scope.eventTabs = event.eventTabs;
 		console.log(event);
 	});

 	$scope.eventEditModal = function (event) {
    	$mdDialog.show({
    		controller: eventEditModalCtrl,
    		templateUrl: '/app/eventsPortal/event/eventEditModal.tmpl.html',
    		locals: {
    			eventPassed: event
    		}
    	})
    	.then(function (response) {
    		console.log(response);
    	}, function () {
    		// console.log('Cancel editing deal');
    	});
    };		

    function eventEditModalCtrl($scope, $mdDialog, eventPassed) {	
    	console.log(eventPassed);
    	$scope.editEvent = eventPassed;
    	
        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.save = function () {
            EventsPortalService.editEvent({
            	event: {
                _id: $scope.editEvent._id,
                name: $scope.editEvent.name,
                info: $scope.editEvent.info
            	},
            	assignees: $scope.assignee,
                eventCategory: $scope.eventCat
            })
            .then(function (data) {
            	$mdDialog.hide();
            	location.reload();
            });
		};    	
    }
  });
