'use strict';

angular.module('erp2015App')
  .controller('EventsPortalCoresCtrl', function ($scope, EventsPortalService, $state, $http, $upload) {
    $scope.submitted = false;

    EventsPortalService.getCoords()
      .then(function (data) {
        $scope.coords = data;
      },function (err){
        console.log(err);
      });

    EventsPortalService.getAllEventLists()
      .then(function (data) {
        $scope.eventLists = data;
      },function (err){
        console.log(err);
      });  
    $scope.selectedCoords = []; 
    $scope.selectedEventLists = [];
   
    $scope.myImage = '';
    $scope.myCroppedImage = '';

    var handleFileSelect = function (evt) {
      var myfile = evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply( function ($scope) {
          $scope.myImage = evt.target.result;
        });
      };
      reader.readAsDataURL(myfile);
    };
    angular.element(document.querySelector('#file')).on('change', handleFileSelect);

   	$scope.newEventList = function (form) {
    	$scope.submitted = true;

      /*console.log($scope.eventList.title)
      console.log($scope.eventList.info)
      console.log(form.$error);*/
      /*console.log("this is ");
      console.log($scope.myCroppedImage)*/
      // $http.post('/api/uploads', {file: $scope.myCroppedImage});
      if(form.$valid) {
        $upload.upload({
          url: 'api/uploads',
          file: $scope.myCroppedImage
        })
        .success(function (data, status, headers, config) {
          console.log('done');
        });

    		EventsPortalService.createEventList({
      		title: $scope.eventList.title,
      		info: $scope.eventList.info
    		})
    		.then(function (data) {
          $state.go('eventList');
    		})
    		.catch(function (err) {
      		err = err.data;
      		$scope.errors = {};

      		// Update validity of form fields that match the mongoose errors
      		angular.forEach(err.errors, function (error, field) {
      			form[field].$setValidity('mongoose', false);
      			$scope.errors[field] = error.message;
      		});
    		});
    	}
  	};

    $scope.createEvent = function (form) {
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
        EventsPortalService.createEvent({
          name: $scope.event.title,
          info: $scope.event.info,
          assignees: $scope.coordsIds,
          eventCategory: $scope.eventListIds
        })
        .then(function (data) {
          $state.go('eventList');
          // angular.forEach($scope.selectedEventLists, function (selectedEventList) {
          //   selectedEventList.events.push(data);
          //   $scope.eventIds = [];
          //   angular.forEach(selectedEventList.events, function (item) {
          //     $scope.eventIds.push(item._id);
          //   });
          //   EventsPortalService.editEventList({
          //     _id: selectedEventList._id,
          //     events: $scope.eventIds
          //   })
          //   .then(function (data){
          //     console.log(data);
          //     $state.go('eventList');
          //   })
          //   .catch(function (err){
          //     console.log(err);
          //   });  
          // });
        })
        .catch(function (err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function (error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
          });
        });
      }
    };
});
