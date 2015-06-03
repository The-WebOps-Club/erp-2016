'use strict';

angular.module('erp2015App')
  .controller('EventsPortalEventListCtrl', function ($scope, EventsPortalService, $state, $http) {

    EventsPortalService.getAllEventLists()
    	.then(function (allEventLists) {
        	console.log(allEventLists);
    		$scope.allEventLists = allEventLists;
    	});

	$scope.eventListEditModal = function (eventList) {
    	$mdDialog.show({
    		controller: eventListEditModalCtrl,
    		templateUrl: '/app/eventsPortal/eventList/eventListEditModal.tmpl.html',
    		locals: {
    			eventListPassed: $scope.eventList
    		}
    	})
    	.then(function (response) {
    		console.log(response);
    	}, function () {
    		console.log('Cancel editing deal');
    	});
    };		

    function eventListEditModalCtrl($scope, $mdDialog, eventListPassed) {
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
            	console.log(data)
                //$state.go('eventList');
            });

			$mdDialog.hide('Save edited deal');
		};    	
    }

});
