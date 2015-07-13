'use strict';

angular.module('erp2015App')
  .controller('EventsPortalCoresCtrl', function ($scope, EventsPortalService, $state, $http, $upload) {
    $scope.submitted = false;
    $scope.myImage='';
    $scope.myCroppedImage='';
    var imageid='';
    var imagename='';

    var uploadfile='';

    var dataURItoBlob = function(dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var array = [];
        for(var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: mimeString});
      };

     var handleFileSelect=function(evt) {
        var myfile=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
          $scope.$apply(function($scope){
            $scope.myImage=evt.target.result;
          });
          uploadfile=myfile;
        };
        reader.readAsDataURL(myfile);
      };
      angular.element(document.querySelector('#file')).on('change',handleFileSelect);

   	$scope.newEventList = function(form) {
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
                        file: dataURItoBlob($scope.myCroppedImage)
                    }).success(function (data, status, headers, config){
                      console.log('done');
                      console.log(uploadfile.name);
                      console.log(data.fileId);
                      imageid=data.fileId;
                      imagename=uploadfile.name;
                      console.log(imageid);
                      console.log(imagename);
                          EventsPortalService.createEventList({
                            title: $scope.eventList.title,
                            info: $scope.eventList.info,
                            imageid: imageid,
                            imagename: imagename
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
                    }).error(function (data, status, headers, config){
                      console.log('done');
                      console.log(uploadfile.name);
                      console.log(data.fileId);
                      imageid=data.fileId;
                      imagename=uploadfile.name;
                      console.log(imageid);
                      console.log(imagename);
                          EventsPortalService.createEventList({
                            title: $scope.eventList.title,
                            info: $scope.eventList.info,
                            imageid: imageid,
                            imagename: imagename
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
                    });

      		// EventsPortalService.createEventList({
        // 		title: $scope.eventList.title,
        // 		info: $scope.eventList.info,
        //     imageid: imageid,
        //     imagename: imagename
      		// })
      		// .then(function (data) {
        //     	$state.go('eventList');
      		// })
      		// .catch(function (err) {
        // 		err = err.data;
        // 		$scope.errors = {};

        // 		// Update validity of form fields that match the mongoose errors
        // 		angular.forEach(err.errors, function (error, field) {
        //   			form[field].$setValidity('mongoose', false);
        //   			$scope.errors[field] = error.message;
        // 		});
      		// });
    	}
  	};
});
