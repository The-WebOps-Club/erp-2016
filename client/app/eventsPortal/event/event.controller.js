'use strict';

angular.module('erp2015App')
  .controller('EventsPortalEventCtrl', function ($scope,$http,EventsPortalService, $mdToast, $mdDialog, Auth) {
    var id = location.pathname.split('/')[3];
 	EventsPortalService.getEvent(id).then(function (event){
 		var converter = new showdown.Converter();
 		$scope.event = event;
 		var xdata;
		$scope.currentTab="";
 		$scope.markdown=[];
 		$scope.inServer=[];
 		$scope.index=0;
 		$scope.tabMode=false;
        $scope.selectedEventLists=event.eventCategory;
        $(".leftButtons").hide();

		$.ajax({ url: '/api/eventTabs/'+event._id, success: function(data) { $scope.eventTabs=data; } }).done(function () {
			$scope.eventTabs.sort(function (a, b) {
				if(a.tabNumber<b.tabNumber)
					return -1;
				else if(a.tabNumber>b.tabNumber)
					return 1;
				else
					return 0;
			});
			$scope.eventTabs.forEach(function (tab) {
        		$(".leftButtons").show();
				$scope.markdown[tab._id]=tab.info;
				$scope.inServer[tab._id]=true;
			});
			if($scope.eventTabs.length>0)
				$scope.currentTab=$scope.eventTabs[0]._id;
		});

		$scope.isAdmin = Auth.isAdmin;

 		$scope.buildCatString = function() {
 			var cat="";
	 		for(var i=0; i<$scope.event.eventCategory.length; i++) {
	 			cat+=$scope.event.eventCategory[i].title;
	 			if(i!=$scope.event.eventCategory.length-1)
	 				cat+=", ";
	 		}
	 		return cat;
	 	}

	 	$scope.getVisiblity = function () {
	 		if($scope.event.acceptedByAdmin)
	 			return "";
	 		else
	 			return "in";
	 	}

	 	$scope.toggleVisiblity = function () {
			EventsPortalService.toggleEvent({
				acceptedByAdmin: $scope.event.acceptedByAdmin
			}, $scope.event._id).then(function () {
				$mdToast.show($mdToast.simple().content('Updated event successfully!').hideDelay(5000));
			})
      		.catch(function (err) {
				$mdToast.show($mdToast.simple().content('You are not authorized to do that.').hideDelay(5000));
				$scope.event.acceptedByAdmin=!$scope.event.acceptedByAdmin;
      		});
	 	}

		$scope.showAdvanced = function(ev) {
		    $mdDialog.show({
		      controller: DialogController,
		      templateUrl: 'dialog1.tmpl.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      resolve: {
				event: function () {
					return event;
		      	},
		      	EventsPortalService: function () {
		      		return EventsPortalService;
		      	},
		      	selectedEventLists: function () {
		      		return $scope.selectedEventLists;
		      	},
		      	buildCatString: function() {
		 			var cat="";
			 		for(var i=0; i<$scope.event.eventCategory.length; i++) {
			 			cat+=$scope.event.eventCategory[i].title;
			 			if(i!=$scope.event.eventCategory.length-1)
			 				cat+=", ";
			 		}
	 			}
		      }
		    })
		    .then(function(answer) {
		      $scope.alert = 'You said the information was "' + answer + '".';
		    }, function() {
		      $scope.alert = 'You cancelled the dialog.';
		    });
		}

 		$scope.newTab = function () {
 			var promptName=prompt("Enter the name of the tab", "");
 			if(promptName!=null) {
	 			if (/\S/.test(promptName)) {
	 				var num=Math.max.apply(Math, $scope.eventTabs.map(function(o){return o.tabNumber;}));
		 			var tabData={'name': promptName, 'info': '', 'tabNumber': num+1, 'eventID': $scope.event._id, '_id': String($scope.eventTabs.length+1)};
		      		$scope.eventTabs.push(tabData);
				    $scope.markdown[$scope.eventTabs.length]="";
					$mdToast.show($mdToast.simple().content('Add content in \''+promptName+'\' to save to server').hideDelay(5000));
		        	$(".leftButtons").show();
		        	if($scope.eventTabs.length==1)
		        		$scope.currentTab="1";
		        	console.log(tabData);
			    	$scope.eventTabs[$scope.eventTabs.length-1].active=true;
				}
				else
					$mdToast.show($mdToast.simple().content('Tab name cannot be empty').hideDelay(5000));
			}
    	};

    	$scope.setTab = function (b, c) {
    		console.log("setTab("+b+")");
    		$scope.currentTab=b;
    		$scope.index=c;
    		$scope.oldIndex=$scope.selectedIndex;
    	}

    	$scope.removeTab = function() {
    		if(confirm("Delete this tab?")) {
	    		var idx=-1;
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
	    		if($scope.eventTabs.length==0)
	        		$(".leftButtons").hide();
	        }
		};

		$scope.xmark = function (b) {
			return converter.makeHtml(b);
		}

		$scope.publishChange = function () {
    		var tab=$scope.eventTabs.filter(function (tab) {
    			console.log(tab);
    			return tab._id==$scope.currentTab;
    		})[0];
    		if($scope.markdown[$scope.currentTab]=="") {
		    	$mdToast.show($mdToast.simple().content('Tab content cannot be empty').hideDelay(5000));
		    	return;
		    }
  			$.ajax({
		        url: "/api/eventTabs/"+tab._id,
		        type: "PATCH",
		        data: {'name': tab.name, 'info': $scope.markdown[$scope.currentTab], 'tabNumber': tab.tabNumber, 'eventID': $scope.event._id}
		    }).done(function () {
		    	$mdToast.show($mdToast.simple().content('Tab changes successfully saved!').hideDelay(5000));
		    });
		}

    	$scope.saveChanges = function() {
		    if($scope.inServer[$scope.currentTab]!=true) {
	    		var tab=$scope.eventTabs.filter(function (tab) {
	    			return tab._id==$scope.currentTab;
	    		})[0];
	    		if($scope.markdown[$scope.currentTab]=="") {
			    	$mdToast.show($mdToast.simple().content('Tab content cannot be empty').hideDelay(5000));
			    	return;
			    }
			    console.log($scope.currentTab);
	    		$scope.old_id=tab._id;
				delete tab._id;
			    $.ajax({
			        url: "/api/eventTabs",
			        type: "POST",
			        data: tab,
			        success: function(data) { $scope.new_id=data._id; }
			    }).done(function () {
			    	$scope.inServer[$scope.currentTab]=true;
			    	$scope.currentTab=$scope.new_id;
			    	tab._id=$scope.new_id;
			    	$scope.markdown[$scope.new_id]=$scope.markdown[$scope.old_id];
			    	$scope.publishChange();
		    	});
			}
			else
				$scope.publishChange();
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

		$scope.reorderTabs = function(ev) {
		    $mdDialog.show({
		      controller: reorderController,
		      templateUrl: 'dialog2.tmpl.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      resolve: {
				eventTabs: function () {
					return $scope.eventTabs;
		      	},
		      	EventsPortalService: function () {
		      		return EventsPortalService;
		      	}
		      }
		    })
		    .then(function(answer) {
		      $scope.alert = 'You said the information was "' + answer + '".';
		    }, function() {
		      $scope.alert = 'You cancelled the dialog.';
		    });
		}
 	});
});

function DialogController($scope, $mdDialog, event, EventsPortalService, selectedEventLists, $mdToast, buildCatString) {
	$scope.event = event;
	$scope.selectedEventLists = selectedEventLists;
	$scope.buildCatString = buildCatString;


	EventsPortalService.getAllEventLists()
	.then(function (data) {
		$scope.eventLists = data;
	}, function(err) {
		console.log(err);
	});
	EventsPortalService.getCoords()
	.then(function (data) {
		$scope.coords = data;
	},function(err) {
		console.log(err);
	});
	$scope.hide = function() {
		$mdDialog.hide();
	};

	$scope.cancel = function() {
		$mdDialog.cancel();
		EventsPortalService.getEvent($scope.event._id).then(function (gevent){
 			event.name = gevent.name;
 			event.eventCategory = gevent.eventCategory;
 			event._id = gevent._id;
 			event.info = gevent.info;
 			event.createdOn = gevent.createdOn;
 			event.updatedOn = gevent.updatedOn;
 		});
	};

	$scope.answer = function(answer) {
		$mdDialog.hide(answer);
	};

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

      if(form.$valid) {
          EventsPortalService.updateEvent({
            name: $scope.event.name,
            info: $scope.event.info,
            assignees: $scope.coordsIds,
            eventCategory: $scope.eventListIds	
          }, $scope.event._id).then(function () {
		  	$mdToast.show($mdToast.simple().content('Updated event successfully!').hideDelay(5000));
		  	$scope.buildCatString();
		  });
      }
	  $mdDialog.cancel();
    };
}


function reorderController($scope, $mdDialog, eventTabs, EventsPortalService, $mdToast) {
	$scope.xeventTabs = eventTabs;
    $scope.origNums=[];
    $scope.currentNums=[];
    $scope.flag=0;

    $scope.xeventTabs.forEach(function (tab, index) {
    	$scope.origNums[index]=tab.tabNumber;
    	$scope.currentNums[index]=tab.tabNumber;
    });

	$scope.clog = function (s) {
		var current=$scope.xeventTabs[s];
		$scope.origNums.forEach(function (num, index) {
			if(num==$scope.currentNums[s] && s!=index) {
				var other=$scope.xeventTabs[index];
				$scope.currentNums[index]=$scope.origNums[s];
				var temp=$scope.origNums[s];
				$scope.origNums[s]=$scope.origNums[index];
				$scope.origNums[index]=temp;
				temp=current.tabNumber;
				current.tabNumber=other.tabNumber;
				other.tabNumber=temp;
				$scope.xeventTabs.sort(function (a, b) {
					if(a.tabNumber<b.tabNumber)
						return -1;
					else if(a.tabNumber>b.tabNumber)
						return 1;
					else
						return 0;
				});
			}
		});
	}

	$scope.hide = function() {
		$mdDialog.hide();
	};

	$scope.cancel = function() {
		$mdDialog.cancel();
	};

	$scope.doReorder = function(answer) {
		$scope.xeventTabs.forEach(function (tab) {
			$.ajax({
		        url: "/api/eventTabs/"+tab._id,
		        type: "PATCH",
		        data: {'tabNumber': tab.tabNumber}
		    });
		});
		$mdDialog.cancel();
		$mdToast.show($mdToast.simple().content('Tab order changed successfully!').hideDelay(5000));
	};
}
