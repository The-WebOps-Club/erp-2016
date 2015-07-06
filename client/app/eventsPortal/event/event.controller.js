'use strict';

angular.module('erp2015App')
  .controller('EventsPortalEventCtrl', function ($scope,$http,EventsPortalService) {
    
    var id = location.pathname.split('/')[3];
 	EventsPortalService.getEvent(id).then(function (event){
 		$scope.event = event;
 		$scope.eventTabs = event.eventTabs;
 		console.log(event);
 	});


  });
