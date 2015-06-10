'use strict';

angular.module('erp2015App')
  .controller('EventsPortalCoresCtrl', function ($scope, EventsPortalService, $state, $http, $upload) {
    $scope.submitted = false;
    $scope.myImage='';
    $scope.myCroppedImage='';

     var handleFileSelect=function(evt) {
        var myfile=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
          $scope.$apply(function($scope){
            $scope.myImage=evt.target.result;
          });
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
                        url: 'api/uploads',
                        file: $scope.myCroppedImage
                    }).success(function (data, status, headers, config){
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
});
