'use strict';

angular.module('erp2015App').controller('webEventCtrl', function ($state, $scope, $stateParams, $http, EventsPortalService, $mdDialog, $location, $mdToast, Auth) {    
  var id = $stateParams.id;
  EventsPortalService.getEvent(id).then(function (event) {
    var converter = new showdown.Converter();
    $scope.event = event;
    $scope.assignees = event.assignees;
    var xdata;
    $scope.currentTab = "";
    $scope.markdown = [];
    $scope.inServer = [];
    $scope.registered = false;
    $http.get('/api/teams').then(function (res) {
      var teams = res.data;
      $scope.teamList = teams;
      $scope.selectedTeam = $scope.teamList[0]._id;
      $scope.teamList[0].teamName = "Participate individually";
      console.log(teams);
      teams.filter(function(n) {
        if(n.eventsRegistered.indexOf(event._id) != -1)
          $scope.registered = true;
      });
    });
    $scope.index = 0;
    $scope.showList = function () {
      return ($scope.event.maxTeamMembers != 1 && !$scope.registered);
    }

    $http.get('/api/eventTabs/' + event._id).then(function (data) {
      $scope.eventTabs = data.data;
      $scope.eventTabs.sort(function (a, b) {
        if(a.tabNumber < b.tabNumber)
          return -1;
        else if(a.tabNumber > b.tabNumber)
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

    $scope.buildCatString = function () {
     var cat = "";
     for(var i=0; i<$scope.event.eventCategory.length; i++) {
       cat += $scope.event.eventCategory[i].title;
       if(i != $scope.event.eventCategory.length-1)
         cat+=", ";
     }
     return cat;
    }

    $scope.whatString = function () {
      if($scope.registered)
        return "Unregister from event";
      else
        return "Register for event";
    }

    $scope.xmark = function (b) {
      return converter.makeHtml(b);
    }

    $scope.toggleRegister = function (ev) {
      if(!$scope.registered) {
         var confirm = $mdDialog.confirm()
        .title('Are you sure you want to register for the event?')
        .content(($scope.event.maxTeamMembers > 1 ? 'Note: The whole team will be registered for the event.': ''))
        .ariaLabel('Confirm')
        .ok('Yes')
        .cancel('Cancel')
        .targetEvent(ev);
        if($scope.event.maxTeamMembers == 1) {
          $scope.selectedTeam = Auth.getCurrentUser().selfTeam;   
        }
        $mdDialog.show(confirm).then(function() {
          $http.post('/api/registrations/', {eventRegistered: event._id, team: $scope.selectedTeam}).then(function (data) {
            if(data.status == 200) {
              $mdToast.show($mdToast.simple().content('Registration successful!').hideDelay(5000));
              $scope.registered = !$scope.registered;
            } else
              $mdToast.show($mdToast.simple().content('There was some error in registration.').hideDelay(5000));
          });
        });
      } else {
          var confirm = $mdDialog.confirm()
          .title('Are you sure you want to unregister from the event?')
          .content(($scope.event.maxTeamMembers > 1 ? 'Note: The whole team and ALL its members will be unregistered from the event!': ''))
          .ariaLabel('Confirm')
          .ok('Yes')
          .cancel('Cancel')
          .targetEvent(ev);
          $mdDialog.show(confirm).then(function() {
            $http.delete('/api/registrations/' + event._id).then(function (data) {
              if(data.status == 204) {
                $mdToast.show($mdToast.simple().content(($scope.event.maxTeamMembers > 1 ? 'Team u':'U') + 'nregistered from event.').hideDelay(5000));
                $scope.registered = !$scope.registered;
              }
            });
          });
      }
    }
  });
});
