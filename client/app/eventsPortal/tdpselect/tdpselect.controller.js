'use strict';

angular.module('erp2015App')
  .controller('TdpselectCtrl', function ($scope, $state, $stateParams, $http, EventsPortalService) {
    var id = $stateParams.id;
    EventsPortalService.getEvent(id).then(function (event) {
    	$scope.event=event;

	    $scope.buildCatString = function () {
	      var cat = "";
	      for(var i = 0; i<$scope.event.eventCategory.length; i++) {
	        cat += $scope.event.eventCategory[i].title;
	        if(i !=  $scope.event.eventCategory.length-1)
	          cat += ", ";
	      }
	      return cat;
	    }
	    $http.get("/api/tdpforms/"+event._id).then(function (data) {
	    	$scope.list=data.data;
	    	$scope.numSelected=0;
	    	$http.get("/api/tdpresponses/all/"+event.tdpForm).then(function (data2) {
	    		$scope.list2=data2.data;
	    		for(var k=0; k<$scope.list2.length; k++)
	    			$scope.numSelected+=$scope.list2[k].isSelected;
	    		$scope.numResponses=$scope.list2.length;
	    		$scope.selected = function(r) {
	    			if($scope.list2[r].isSelected)
	    				return "";
	    			else
	    				return "not";
	    		}
	    		$scope.toggleSelection = function (r) {
	    			$http.put("/api/tdpresponses/toggle/"+$scope.list2[r]._id).then(function() {
	    				$scope.numSelected=0;
			    		for(var k=0; k<$scope.list2.length; k++)
			    			$scope.numSelected+=$scope.list2[k].isSelected;
		    			if($scope.list2[r].isSelected)
		    				$scope.selected[r]="";
		    			else
		    				$scope.selected[r]="not";
	    			});
	    		}
	    		$scope.goto = function (r) {
	    			$scope.list2[r].fileID="abcd";
	    			$scope.list2[r].fileExtension='pdf';
	    			window.location='/api/uploads/'+$scope.list2[r].fileID+'/'+event.name+' - '+$scope.list2[r].team.teamName+' - TDP.'+$scope.list2[r].fileExtension;
	    		}
	    	});
	    });
	});
  });
