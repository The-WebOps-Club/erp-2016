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
    $scope.myImage2 = '';
    $scope.myCroppedImage = '';
    $scope.myCroppedImage2 = '';

    var imageIdEventList = '';
    var imageNameEventList = '';
    var uploadFileEventList = '';

    var imageIdEvent = '';
    var imageNameEvent = '';
    var uploadFileEvent = '';

    var dataURItoBlob = function (dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      var array = [];
      for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type: mimeString});
    };

    $scope.isTeamEvent = function () {
      return !($scope.individualEvent);
    }

    $scope.maxTeamMembers = 1;
    $scope.individualEvent = $scope.maxTeamMembers == 1;

    $scope.toggleIndividuality = function() {
      if($scope.individualEvent)
        $scope.maxTeamMembers = 1;
    }

    $scope.fff = function(b) {
      $scope.maxTeamMembers = b;
    }

    var handleFileSelect = function(evt) {
      console.log(evt.currentTarget.files);
      var myfile = evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function ($scope) {
          $scope.myImage = evt.target.result;
        });
        uploadFileEventList = myfile;
      };
      reader.readAsDataURL(myfile);
    };

    var handleFileSelect2 = function(evt) {
      console.log(evt.currentTarget.files);
      var myfile = evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function ($scope) {
          $scope.myImage2 = evt.target.result;
        });
        uploadFileEvent = myfile;
      };
      reader.readAsDataURL(myfile);
    };
    angular.element(document.querySelector('#file')).on('change', handleFileSelect);
    angular.element(document.querySelector('#file2')).on('change', handleFileSelect2);

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
          url: 'api/uploads/',
          file: dataURItoBlob($scope.myImage)
          // file: dataURItoBlob($scope.myCroppedImage)
        })
        .success(function (data, status, headers, config) {
          // console.log('done');
          // console.log(uploadFileEventList.name);
          // console.log(data.fileId);
          imageIdEventList = data.fileId;
          imageNameEventList = uploadFileEventList.name;
          // console.log(imageid);
          // console.log(imagename);

          EventsPortalService.createEventList({
            title: $scope.eventList.title,
            info: $scope.eventList.info,
            imageid: imageIdEventList,
            imagename: imageNameEventList
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
        })
        .error(function (data, status, headers, config) {
          console.log('File upload error');
        });

     		// EventsPortalService.createEventList({
        //   title: $scope.eventList.title,
        // 	 info: $scope.eventList.info,
        //   imageid: imageid,
        //   imagename: imagename
     		// })
     		// .then(function (data) {
        //   $state.go('eventList');
     		// })
     		// .catch(function (err) {
        //   err = err.data;
        //   $scope.errors = {};

        // 	// Update validity of form fields that match the mongoose errors
        // 	 angular.forEach(err.errors, function (error, field) {
        //     form[field].$setValidity('mongoose', false);
        //   	 $scope.errors[field] = error.message;
        // 	 });
     		// });
    	}
  	};

    $scope.createEvent = function (form) {
      $scope.submitted = true;
      if(form.$valid) {
        $upload.upload({
          url: 'api/uploads/',
          file: dataURItoBlob($scope.myCroppedImage2)
        })
        .success(function (data, status, headers, config) {
          imageIdEvent = data.fileId;
          imageNameEvent = uploadFileEvent.name;
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
              maxTeamMembers: $scope.maxTeamMembers,
              venue: $scope.venue,
              imageid: imageIdEvent,
              imagename: imageNameEvent,
              eventCategory: $scope.eventListIds
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
        })
        .error(function (data, status, headers, config) {
          console.log('File upload error');
        });
      }
    }
});
