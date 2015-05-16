'use strict';

angular.module('erp2015App')
  .controller('CoordPortalEditProfileCtrl', function ($scope, $http, $location, CoordPortalService, Auth) {
  	$scope.errors = {};
  	$scope.user = Auth.getCurrentUser();

  	// console.log($scope.user);
  	$scope.updateProfile = function(form) {
  		$scope.submitted = true;

  		if(form.$valid) {
  			console.log($scope.user);
  			Auth.updateProfile({
	          name: $scope.user.name,
	          city: $scope.user.city,
	          phoneNumber: $scope.user.phoneNumber,
	          summerLocation: $scope.user.summerLocation,
	          cgpa: $scope.user.cgpa
  			})
  			.then( function() {
	          // Account created, redirect to dashboard
	          $location.url('/coordPortal/editProfile');
  			})
  			.catch( function(err) {
	          err = err.data;
	          $scope.errors = {};

	          console.log(err)
	          // Update validity of form fields that match the mongoose errors
	          angular.forEach(err.errors, function (error, field) {
	            form[field].$setValidity('mongoose', false);
	            $scope.errors[field] = error.message;
	          });
  			});
  		}
  	};
  });
