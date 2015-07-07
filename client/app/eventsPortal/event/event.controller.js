'use strict';

angular.module('erp2015App')
  .controller('EventsPortalEventCtrl', function ($scope,$http,EventsPortalService, $mdToast) {
    var id = location.pathname.split('/')[3];
 	EventsPortalService.getEvent(id).then(function (event){
 		$scope.event = event;
 		var xdata;
		$.ajax({ url: '/api/eventTabs/'+event._id, success: function(data) { $scope.eventTabs=data; console.log(data); } }).done(function () {
			$scope.eventTabs.sort(function (a, b) {
				if(a.tabNumber<b.tabNumber)
					return -1;
				else if(a.tabNumber>b.tabNumber)
					return 1;
				else
					return 0;
			});
		});

 		var cat="";
 		for(var i=0; i<event.eventCategory.length; i++) {
 			cat+=event.eventCategory[i].title;
 			if(i!=event.eventCategory.length-1)
 				cat+=", ";
 		}
 		$scope.categoryString=cat;

 		JSON.stringify(eval("(" + $scope.eventTabs + ")"));
 		console.log($scope.eventTabs);


 		$scope.currentTab=0;

 		$scope.newTab = function () {
 			var promptName=prompt("Enter the name of the tab", "");
      		$scope.eventTabs.push({name: promptName, info: 'Add content here', evntDetails: [], tabNumber: $scope.eventTabs.length});
		    $.ajax({
		        url: "/api/eventTabs",
		        type: "POST",
		        data: {'name': promptName, 'info': 'Add content here', 'tabNumber': $scope.eventTabs.length+2, 'eventID': $scope.event._id}
		    });
		    $.ajax({ url: '/api/eventTabs/'+event._id, success: function(data) { $scope.eventTabs=data; console.log(data); } });
    	};

    	$scope.setTab = function (b) {
    		$scope.currentTab=b;
    		console.log(b);
    	}

    	$scope.removeTab = function() {
    		var idx=-1;
    		if($scope.currentTab<2) {
    			$mdToast.show($mdToast.simple().content('This is a mandatory tab. You cannot remove this.').hideDelay(5000));
    			return;
    		}
    		$scope.eventTabs=$scope.eventTabs.filter(function (tab) {
    			if(tab._id==$scope.currentTab) {    				
		    		var i=12;
		    		$scope.eventTabs.forEach(function (tab) {
		    			tab.tabNumber=i;
		    			i++;
		    		});
	      			$.ajax({
				        url: "/api/eventTabs/"+tab._id,
				        type: "DELETE"
				    });
    				return false;
    			}
    			else
    				return true;
    		});
		};

    	$scope.editTab = function() {
    		if($scope.currentTab==0) {
    		}
    		else if($scope.currentTab==1) {
      			$('.summernote').summernote();
      			$('.saveButton').show();
    		}
    		else {
	    		var tab=$scope.eventTabs.filter(function (tab) {
	    			return tab._id==$scope.currentTab;
	    		})[0];
      			$('.summernote_'+tab._id).summernote();
      			$('.saveButton').show();      			
      			$.ajax({
			        url: "/api/eventTabs/"+tab._id,
			        type: "PATCH",
			        data: {'name': tab.name, 'info': $('.summernote_'+tab._id).html(), 'tabNumber': $scope.eventTabs.length+2, 'eventID': $scope.event._id}
			    });
	    	}
		};

    	$scope.saveChanges = function() {
    		if($scope.currentTab==0) {
    		}
    		else if($scope.currentTab==1) {
      			$('.summernote.ng-scope').destroy();
      			$('.saveButton').hide();
      			alert($('.summernote.ng-scope').html());
    		}
    		else {
	    		var tab=$scope.eventTabs.filter(function (tab) {
	    			return tab._id==$scope.currentTab;
	    		})[0];
	    		console.log(tab);
      			$('.summernote_'+tab._id).destroy();
      			$('.saveButton').hide();
      			$.ajax({
			        url: "/api/eventTabs/"+tab._id,
			        type: "PATCH",
			        data: {'name': tab.name, 'info': $('.summernote_'+tab._id).html(), 'tabNumber': $scope.eventTabs.length+2, 'eventID': $scope.event._id}
			    });
	    	}
		};
 	});


  })