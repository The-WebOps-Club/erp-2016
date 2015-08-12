'use strict';

angular.module('erp2015App')
  .controller('editProfileCtrl', function ($scope, $http, $location, CoordPortalService, Auth) {
  	$scope.errors = {};
  	$scope.user = Auth.getCurrentUser();

    $scope.hostels = ['Alakananda',
               'Bhadra',
               'Brahmaputra',
               'Cauvery',
               'Ganga',
               'Godavari',
               'Jamuna',
               'Krishna',
               'Mahanadhi',
               'Mandakini',
               'Narmada',
               'Pampa',
               'Saraswathi',
               'Sabarmati',
               'Sarayu',
               'Sharavati',
               'Sindhu',
               'Sarayu Extension',
               'Tamraparani',
               'Tapti',
               'Tunga',
               'Day Scholar'
               ];
  	// console.log($scope.user);
  	$scope.updateProfile = function(form) {
  		$scope.submitted = true;

  		if(form.$valid) {
  			console.log($scope.user);
  			Auth.updateProfile({
	          name: $scope.user.name,
	          city: $scope.user.city,
	          phoneNumber: $scope.user.phoneNumber,
	          hostel: $scope.user.hostel,
	          roomNumber: $scope.user.roomNumber
  			})
  			.then( function() {
	          // Account created, redirect to dashboard
	          $location.url('/editProfile');
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
  }).config( function($mdThemingProvider){
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();
  });;
