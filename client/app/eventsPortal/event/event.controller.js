'use strict';

angular.module('erp2015App')
  .controller('EventsPortalEventCtrl', function ($scope,$http,EventsPortalService, $mdToast) {
    var id = location.pathname.split('/')[3];
 	EventsPortalService.getEvent(id).then(function (event){
 		var converter = new showdown.Converter();
 		$scope.event = event;
 		var xdata;
		$scope.currentTab=0;
 		$scope.markdown=[];
 		$scope.markdown[1]=event.info;

 		EventsPortalService.getAllEventLists()
        .then(function (data) {
          $scope.eventLists = data;
        },function (err){
          console.log(err);
        }); 

	    EventsPortalService.getCoords()
	      .then(function (data) {
	        $scope.coords = data;
	      },function (err){
	        console.log(err);
	      });
        $scope.selectedEventLists=event.eventCategory;
        $(".leftButtons").hide();

		$.ajax({ url: '/api/eventTabs/'+event._id, success: function(data) { $scope.eventTabs=data; console.log(data); } }).done(function () {
			$scope.eventTabs.sort(function (a, b) {
				if(a.tabNumber<b.tabNumber)
					return -1;
				else if(a.tabNumber>b.tabNumber)
					return 1;
				else
					return 0;
			});
			$scope.eventTabs.forEach(function (tab) {
				$scope.markdown[tab._id]=tab.info;
			});
		});

 		JSON.stringify(eval("(" + $scope.eventTabs + ")"));
 		console.log($scope.eventTabs);

 		$scope.buildCatString = function() {
 			var cat="";
	 		for(var i=0; i<event.eventCategory.length; i++) {
	 			cat+=event.eventCategory[i].title;
	 			if(i!=event.eventCategory.length-1)
	 				cat+=", ";
	 		}
	 		$scope.categoryString=cat;
	 	}
	 	$scope.buildCatString();

 		$scope.newTab = function () {
 			var promptName=prompt("Enter the name of the tab", "");
 			var tabData={'name': promptName, 'info': '', 'tabNumber': $scope.eventTabs.length+2, 'eventID': $scope.event._id};
      		$scope.eventTabs.push(tabData);
		    $.ajax({
		        url: "/api/eventTabs",
		        type: "POST",
		        data: tabData
		    });
		    $.ajax({ url: '/api/eventTabs/'+event._id, success: function(data) { $scope.eventTabs=data;} });
		    $scope.markdown[$scope.eventTabs.length+2]="";
    	};

    	$scope.setTab = function (b) {
    		$scope.currentTab=b;
    		if(b==0)
    			$(".leftButtons").hide();
    		else
    			$(".leftButtons").show();
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

		$scope.xmark = function (b) {
			return converter.makeHtml(b);
		}

    	$scope.changeTabTitle = function() {
    		if($scope.currentTab==0) {
    		}
    		else if($scope.currentTab==1) {
    		}
    		else {
	    		var tab=$scope.eventTabs.filter(function (tab) {
	    			return tab._id==$scope.currentTab;
	    		})[0];
 				var promptName=prompt("Enter the name of the tab", "");
 				var tabData={'name': promptName, 'info': $scope.markdown[$scope.currentTab], 'tabNumber': tab.tabNumber, 'eventID': $scope.event._id}
      			$.ajax({
			        url: "/api/eventTabs/"+tab._id,
			        type: "PATCH",
			        data: tabData
			    }).done(function () {
			    	$mdToast.show($mdToast.simple().content('Title changed successfully!').hideDelay(5000));
		    		$.ajax({ url: '/api/eventTabs/'+event._id, success: function(data) { $scope.eventTabs=data;} });
			    });
	    	}
		};

    	$scope.saveChanges = function() {
    		if($scope.currentTab==0) {
    		}
    		else if($scope.currentTab==1) {
      			$.ajax({
			        url: "/api/events/"+event._id,
			        type: "PATCH",
			        data: {'info': $scope.markdown[1]}
			    }).done(function () {
			    	$mdToast.show($mdToast.simple().content('Tab changes successfully saved!').hideDelay(5000));
			    });
    		}
    		else {
	    		var tab=$scope.eventTabs.filter(function (tab) {
	    			return tab._id==$scope.currentTab;
	    		})[0];
      			$.ajax({
			        url: "/api/eventTabs/"+tab._id,
			        type: "PATCH",
			        data: {'name': tab.name, 'info': $scope.markdown[$scope.currentTab], 'tabNumber': tab.tabNumber, 'eventID': $scope.event._id}
			    }).done(function () {
			    	$mdToast.show($mdToast.simple().content('Tab changes successfully saved!').hideDelay(5000));
			    });
	    	}
		};
		$(window).bind('keydown', function(event) {
		    if (event.ctrlKey || event.metaKey) {
		        switch (String.fromCharCode(event.which).toLowerCase()) {
		        case 's':
		            event.preventDefault();
		            $scope.saveChanges();
		            break;
		        }
		    }
		});
 	});

    $scope.updateEvent = function(form) {
      $scope.submitted = true;
      $scope.coordsIds = [];
      $scope.eventListIds = [];
      angular.forEach($scope.selectedCoords, function (item) {
        $scope.coordsIds.push(item._id);
      });
      angular.forEach($scope.selectedEventLists, function (item) {
        $scope.eventListIds.push(item._id);
      });
      alert($scope.eventListIds.length);

      if(form.$valid) {
          EventsPortalService.updateEvent({
            name: $scope.event.name,
            info: $scope.event.info,
            assignees: $scope.coordsIds,
            eventCategory: $scope.eventListIds	
          }, $scope.event._id).then(function () {
		  	$mdToast.show($mdToast.simple().content('Updated event successfully!').hideDelay(5000));
		  });
      }
    };


  });
