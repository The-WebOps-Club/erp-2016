'use strict';

angular.module('erp2015App')
  .controller('EventsPortalEventCtrl', function ($state, $stateParams, $scope, $http, EventsPortalService, $mdDialog, $location, $mdToast, Auth) {
    
    var id = $stateParams.id;
    EventsPortalService.getEvent(id).then(function (event) {
    var converter = new showdown.Converter();
    $scope.event = event;
    $scope.assignees = event.assignees;
    var xdata;
    $scope.currentTab = "";
    $scope.markdown = [];
    $scope.inServer = [];
    $scope.index = 0;
    $scope.tabMode = false;
    $scope.selectedEventLists = event.eventCategory;

    $http.get('/api/eventTabs/' + event._id).then(function (data) {
      $scope.eventTabs = data.data;
      console.log($scope.eventTabs);
      $scope.eventTabs.sort(function (a, b) {
        if(a.tabNumber<b.tabNumber)
          return -1;
        else if(a.tabNumber>b.tabNumber)
          return 1;
        else
          return 0;
      });
      $scope.eventTabs.forEach(function (tab) {
        $scope.markdown[tab._id] = tab.info;
        $scope.inServer[tab._id] = true;
      });
      if($scope.eventTabs.length > 0)
        $scope.currentTab = $scope.eventTabs[0]._id;
    });

    $http.get('/api/users/suggestEvent/563f503d7ddbb03d053bc35d').then(function(data) {
      console.log(data);
    });

    $scope.isAdmin = Auth.isAdmin;

    EventsPortalService.getCoords()
    .then(function (data) {
      $scope.coords = data;
    }, function (err) {
      console.log(err);
    });

    $scope.buildCatString = function () {
      var cat = "";
      for(var i = 0; i<$scope.event.eventCategory.length; i++) {
        cat += $scope.event.eventCategory[i].title;
        if(i !=  $scope.event.eventCategory.length-1)
          cat += ", ";
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
      $scope.event.acceptedByAdmin = !$scope.event.acceptedByAdmin;
        });
    }

    $scope.showAdvanced = function (ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/app/eventsPortal/event/dialog1.tmpl.html',
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
          buildCatString: function () {
            var cat = "";
            for(var i = 0; i<$scope.event.eventCategory.length; i++) {
              cat += $scope.event.eventCategory[i].title;
              if(i !=  $scope.event.eventCategory.length-1)
                cat += ", ";
            }
          }
        }
      })
      .then(function (answer) {
        $scope.alert = 'You said the information was "' + answer + '".';
      }, function () {
        $scope.alert = 'You cancelled the dialog.';
      });
    }

    $scope.markdownTutorial = function (ev) {
      $mdDialog.show({
        controller: TutController,
        templateUrl: '/app/eventsPortal/event/dialog4.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev
      })
    }

    $scope.newTab = function () {
      var promptName = prompt("Enter the name of the tab", "");
      if(promptName !=  null) {
        if (/\S/.test(promptName)) {
          var num = Math.max.apply(Math, $scope.eventTabs.map(function (o){return o.tabNumber;}));
          var tabData = {'name': promptName, 'info': '', 'tabNumber': num+1, 'eventID': $scope.event._id, '_id': String($scope.eventTabs.length+1)};
            $scope.eventTabs.push(tabData);
          $scope.markdown[$scope.eventTabs.length] = "";
          $mdToast.show($mdToast.simple().content('Add content in \''+promptName+'\' to save to server').hideDelay(5000));
          $(".leftButtons").show();
          if($scope.eventTabs.length == 1)
            $scope.currentTab = "1";
          $scope.eventTabs[$scope.eventTabs.length-1].active = true;
        }
        else
          $mdToast.show($mdToast.simple().content('Tab name cannot be empty').hideDelay(5000));
      }
    };

    $scope.setTab = function (b, c) {
      console.log("setTab("+b+")");
      $scope.currentTab = b;
      $scope.index = c;
      $scope.oldIndex = $scope.selectedIndex;
    }

    $scope.removeTab = function () {
      if(confirm("Delete this tab?")) {
        var idx = -1;
        $scope.eventTabs = $scope.eventTabs.filter(function (tab) {
          if(tab._id == $scope.currentTab) {            
            var i = 12;
            $scope.eventTabs.forEach(function (tab) {
              tab.tabNumber = i;
              i++;
            });
            $http.delete("/api/eventTabs/"+tab._id);
            return false;
          }
          else
            return true;
        });
        if($scope.eventTabs.length == 0)
            $(".leftButtons").hide();
      }
    };

    $scope.xmark = function (b) {
      return converter.makeHtml(b);
    }

    $scope.publishChange = function () {
      var tab = $scope.eventTabs.filter(function (tab) {
        console.log(tab);
        return tab._id == $scope.currentTab;
      })[0];
      if($scope.markdown[$scope.currentTab] == "") {
        $mdToast.show($mdToast.simple().content('Tab content cannot be empty').hideDelay(5000));
        return;
      }
      $http.put("/api/eventTabs/"+tab._id, {'name': tab.name, 'info': $scope.markdown[$scope.currentTab], 'tabNumber': tab.tabNumber, 'eventID': $scope.event._id}).then(function () {
        $mdToast.show($mdToast.simple().content('Tab changes successfully saved!').hideDelay(5000));
      });
    }

    $scope.saveChanges = function () {
      if($scope.currentTab == -1)
        return;
      if($scope.inServer[$scope.currentTab] !=  true) {
        var tab = $scope.eventTabs.filter(function (tab) {
          return tab._id == $scope.currentTab;
        })[0];
        if($scope.markdown[$scope.currentTab] == "") {
          $mdToast.show($mdToast.simple().content('Tab content cannot be empty').hideDelay(5000));
          return;
        }
        console.log($scope.currentTab);
        $scope.old_id = tab._id;
        delete tab._id;
        $http.post("/api/eventTabs", tab).then(function (resp) {
          console.log(resp);
          var data = resp.data;
          $scope.new_id = data._id;
          $scope.inServer[$scope.currentTab] = true;
          $scope.currentTab = $scope.new_id;
          tab._id = $scope.new_id;
          $scope.markdown[$scope.new_id] = $scope.markdown[$scope.old_id];
          $scope.publishChange();
        });
      }
      else
        $scope.publishChange();
    };
    
    $(window).bind('keydown', function (event) {
      if (event.ctrlKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
        case 's':
          event.preventDefault();
          $scope.saveChanges();
          break;
        }
      }
    });

    $scope.reorderTabs = function (ev) {
      $mdDialog.show({
        controller: reorderController,
        templateUrl: '/app/eventsPortal/event/dialog2.tmpl.html',
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
      .then(function (answer) {
        $scope.alert = 'You said the information was "' + answer + '".';
      }, function () {
        $scope.alert = 'You cancelled the dialog.';
      });
    }
   });

    $scope.editEventPhoto = function (ev) {
      $mdDialog.show({
        controller: photoEditController,
        templateUrl: '/app/eventsPortal/event/dialog3.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        resolve: {
          event: function () {
            return $scope.event;
          },
          EventsPortalService: function () {
            return EventsPortalService;
          }
        }
      });
    }
});

function TutController($scope, $mdDialog) {
  $scope.hide = function () {
    $mdDialog.hide();
  };

  $scope.cancel = function () {
    $mdDialog.cancel();
  };
}

function DialogController($scope, $mdDialog, event, EventsPortalService, selectedEventLists, $mdToast, buildCatString, Auth, $http) {
  $scope.hasRoleCore = Auth.hasRoleCore;
  $scope.event = event;
  $scope.selectedEventLists = selectedEventLists;
  $scope.buildCatString = buildCatString;
  $scope.selectedCoords = event.assignees;
  console.log(event);
  $scope.eventDate = new Date(event.eventDate);
  $scope.eventEndDate = new Date(event.eventEndDate);
  $scope.startReg = new Date(event.startReg);
  $scope.endReg = new Date(event.endReg);

  $scope.isTeamEvent = function () {
    return !($scope.individualEvent);
  }

  $scope.individualEvent = $scope.event.maxTeamMembers == 1;

  $scope.toggleIndividuality = function() {
    if($scope.individualEvent)
      $scope.event.maxTeamMembers = 1;
  }

  EventsPortalService.getAllEventLists()
    .then(function (data) {
      $scope.eventLists = data;
    }, function (err) {
      console.log(err);
  });

  EventsPortalService.getCoords()
    .then(function (data) {
      $scope.coords = data;
    },function (err) {
      console.log(err);
  });

  $scope.chosenLandmark = event.place;
  $http.get('/api/places').then(function (response) {
    $scope.landmarks = response.data;
    console.log($scope.landmark);
  });

  $scope.hide = function () {
    $mdDialog.hide();
  };

  $scope.cancel = function () {
    $mdDialog.cancel();
    EventsPortalService.getEvent($scope.event._id).then(function (gevent) {
      event.name = gevent.name;
      event.eventCategory = gevent.eventCategory;
      event._id = gevent._id;
      event.info = gevent.info;
      event.createdOn = gevent.createdOn;
      event.updatedOn = gevent.updatedOn;
      $scope.eventDate = new Date(event.eventDate);
      $scope.eventEndDate = new Date(event.eventEndDate);
      $scope.startReg = new Date(event.startReg);
      $scope.endReg = new Date(event.endReg);
      console.log(event.assignees);
     });
  };

  $scope.answer = function (answer) {
    $mdDialog.hide(answer);
  };

  $scope.updateEvent = function (form) {
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
        _id: $scope.event._id,
        name: $scope.event.name,
        info: $scope.event.info,
        assignees: $scope.coordsIds,
        eventCategory: $scope.eventListIds,
        eventDate: $scope.eventDate,
        eventEndDate: $scope.eventEndDate
,        startReg: $scope.startReg,
        endReg: $scope.endReg,
        venue: $scope.event.venue,
        maxTeamMembers: $scope.event.maxTeamMembers,
        minTeamMembers: $scope.event.minTeamMembers,
        requireTDP: $scope.event.requireTDP,
        place: $scope.chosenLandmark
      }, event._id).then(function () {
        $mdToast.show($mdToast.simple().content('Updated event successfully!').hideDelay(5000));
      });
      
      $mdDialog.cancel();
    }
    else {
      $mdToast.show($mdToast.simple().content('End of registration must be AFTER the start of registration.').hideDelay(5000));
    }
  };
}

function photoEditController($scope, $mdDialog, event, EventsPortalService, $mdToast, Auth, $document, $upload) {
  $scope.hasRoleCore = Auth.hasRoleCore;
  $scope.event = event;
  console.log(event);

  $scope.myImage2 = '';
  $scope.myCroppedImage2 = '';

  var imageid = '';
  var imagename = '';
  var uploadfile = '';
  
  var handleFileSelect2 = function (evt) {
    console.log(evt.currentTarget.files);
    var myfile = evt.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function (evt) {
      $scope.$apply(function ($scope) {
        $scope.myImage2 = evt.target.result;
        console.log($scope.myImage2);
      });
      uploadfile = myfile;
    };
    reader.readAsDataURL(myfile);
  };
  setTimeout(function () {angular.element(document.querySelector("#imgFile")).on('change', handleFileSelect2)}, 2000);

  var dataURItoBlob = function (dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for(var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: mimeString});
  };
  

  $scope.hide = function () {
    $mdDialog.hide();
  };

  $scope.updateEvent = function (form) {
    $scope.submitted = true;
    if(form.$valid) {
      $upload.upload({
        url: 'api/uploads/',
        file: dataURItoBlob($scope.myCroppedImage2)
      })
      .success(function (data, status, headers, config) {
        imageid = data.fileId;
        imagename = uploadfile.name;
        EventsPortalService.updateEvent({
          imageid: imageid
        }, event._id).then(function (data) {
          $mdToast.show($mdToast.simple().content('Updated event successfully!').hideDelay(5000));
        });
        $mdDialog.cancel();
      });
    }
  };
}

function reorderController($scope, $mdDialog, eventTabs, EventsPortalService, $mdToast, $http) {
  $scope.xeventTabs = eventTabs;
    $scope.origNums = [];
    $scope.currentNums = [];
    $scope.flag = 0;

    $scope.xeventTabs.forEach(function (tab, index) {
      $scope.origNums[index] = tab.tabNumber;
      $scope.currentNums[index] = tab.tabNumber;
    });

  $scope.clog = function (s) {
    var current = $scope.xeventTabs[s];
    $scope.origNums.forEach(function (num, index) {
      if(num == $scope.currentNums[s] && s !=  index) {
        var other = $scope.xeventTabs[index];
        $scope.currentNums[index] = $scope.origNums[s];
        var temp = $scope.origNums[s];
        $scope.origNums[s] = $scope.origNums[index];
        $scope.origNums[index] = temp;
        temp = current.tabNumber;
        current.tabNumber = other.tabNumber;
        other.tabNumber = temp;
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

  $scope.hide = function () {
    $mdDialog.hide();
  };

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
      
    $scope.cancel = function () {
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

  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  $scope.doReorder = function (answer) {
    $scope.xeventTabs.forEach(function (tab) {
      $http.put("/api/eventTabs/"+tab._id, {'tabNumber': tab.tabNumber});
    });
    $mdDialog.cancel();
    $mdToast.show($mdToast.simple().content('Tab order changed successfully!').hideDelay(5000));
  };
}
