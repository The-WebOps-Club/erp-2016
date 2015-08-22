'use strict';

angular.module('erp2015App')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $state, $http, socket, $mdSidenav, $mdUtil) {
    $scope.toggleRight = buildToggler('left');
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                // $log.debug("toggle " + navID + " is done");
              });
          },200);
      return debounceFn;
    }

    $scope.user = Auth.getCurrentUser();
    $scope.notifPage = 1;
    $scope.notifications = [];
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    // $scope.load=function(){
    //   $scope.notifPage=$scope.notifPage+1;
    //   $http.get('/api/notifications/page/'+$scope.notifPage)
    //     .success(function(notifications) {
    //       $scope.notifications=$scope.notifications.concat(notifications);
    //       socket.syncUpdates('post', $scope.notifications);
    //     })
    //     .error(function(err) {
    //       console.log(err);
    //     });
    // }

     //Notifications
     $scope.notifications=
    [
     {
       "_id": "55a0ca12a70d85dd1bbd7ca1",
       "post": {
         "_id": "559f5869b1639ec45f9702d6",
         "wall": {
           "_id": "558a726c78197ed5253c3a1e",
           "name": "Deepak Padamata",
           "parentId": "558a726c78197ed5253c3a1d"
         }
       },
       "user": "558a726c78197ed5253c3a1d",
       "action": "comment",
       "updatedOn": "2015-07-11T07:34:22.204Z",
       "__v": 0,
       "active": true,
       "read": false,
       "commentedBy": [
         {
           "_id": "558a726c78197ed5253c3a1d",
           "name": "Deepak Padamata"
         }
       ]
     },
     {
       "_id": "55a0f4deecda4605196224c2",
       "post": {
         "_id": "55a0f4deecda4605196224c1",
         "wall": {
           "_id": "558a726c78197ed5253c3a1e",
           "name": "Deepak Padamata",
           "parentId": "558a726c78197ed5253c3a1d"
         }
       },
       "user": "558a726c78197ed5253c3a1d",
       "action": "post",
       "postedBy": {
         "_id": "558a726c78197ed5253c3a1d",
         "name": "Deepak Padamata"
       },
       "updatedOn": "2015-07-11T10:50:06.345Z",
       "__v": 0,
       "active": true,
       "read": false,
       "commentedBy": []
     },
     {
       "_id": "55a1fd0e4216aa542b2cb3c0",
       "post": {
         "_id": "55a1fd0e4216aa542b2cb3bf",
         "wall": {
           "_id": "558a726c78197ed5253c3a1e",
           "name": "Deepak Padamata",
           "parentId": "558a726c78197ed5253c3a1d"
         }
       },
       "user": "558a726c78197ed5253c3a1d",
       "action": "post",
       "postedBy": {
         "_id": "558a726c78197ed5253c3a1d",
         "name": "Deepak Padamata"
       },
       "updatedOn": "2015-07-12T05:37:18.252Z",
       "__v": 0,
       "active": true,
       "read": false,
       "commentedBy": []
     },
     {
       "_id": "55a1fd9d400d4af82d8b893d",
       "post": {
         "_id": "55a1fd9d400d4af82d8b893c",
         "wall": {
           "_id": "558a726c78197ed5253c3a1e",
           "name": "Deepak Padamata",
           "parentId": "558a726c78197ed5253c3a1d"
         }
       },
       "user": "558a726c78197ed5253c3a1d",
       "action": "post",
       "postedBy": {
         "_id": "558a726c78197ed5253c3a1d",
         "name": "Deepak Padamata"
       },
       "updatedOn": "2015-07-12T05:39:41.534Z",
       "__v": 0,
       "active": true,
       "read": false,
       "commentedBy": []
     },
     {
       "_id": "55a1fdc16127376e2ee2e038",
       "post": {
         "_id": "55a1fdc16127376e2ee2e037",
         "wall": {
           "_id": "558a726c78197ed5253c3a1e",
           "name": "Deepak Padamata",
           "parentId": "558a726c78197ed5253c3a1d"
         }
       },
       "user": "558a726c78197ed5253c3a1d",
       "action": "post",
       "postedBy": {
         "_id": "558a726c78197ed5253c3a1d",
         "name": "Deepak Padamata"
       },
       "updatedOn": "2015-07-12T05:40:17.760Z",
       "__v": 0,
       "active": true,
       "read": false,
       "commentedBy": []
     } ]

     
    $(document).ready(function()
    {
       //New notification length
    var a=0;
    for (var i = $scope.notifications.length - 1; i >= 0; i--) {
      if ($scope.notifications[i].active==true) {
        var a= a+1;
      };
    };
      if (a!=0) {
        document.getElementById("notification_count").innerHTML = a;
       }else 
       {
        $("#notification_count").hide();
       };
    });
    $("#notificationLink").click(function()
    {
      $("#notificationContainer").fadeToggle(300);
      $("#notification_count").fadeOut(30);
        console.log("hello");
            for (var i = $scope.notifications.length - 1; i >= 0; i--) {
                $scope.notifications[i].active=false;
            };
        
      return false;
    });
    
    //Document Click hiding the popup 
    $(document).click(function()
    {
    $("#notificationContainer").hide();
    });
    //Background


    //Popup on click
    // $("#notificationContainer").click(function()
    // {
    // return false;
    // });
   

    // $scope.read=function(){
    //   console.log("hello");
    //   for (var i = $scope.notifications.length - 1; i >= 0; i--) {
    //     var active=$scope.notifications[i].active;
    //     active=false;
    //   };
    //   var a=0;
    //       for (var i = $scope.notifications.length - 1; i >= 0; i--) {
    //   if ($scope.notifications[i].active==true) {
    //     var a= a+1;
    //   };
    // };
    // document.getElementById("notification_count").innerHTML = a;
    // };

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.profilePic = Auth.getCurrentUser().profilePic;
    $scope.logout = function() {
      Auth.logout();
      // $location.path('/login');
      $state.go('login');
      // $location.url('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
    
  });