'use strict';

angular.module('erp2015App')
  .controller('EventMarqueeNotificationsCtrl', function ($scope, $http, $stateParams, $mdToast) {
    $scope.notifs = [];
    $scope.eventDetails = [];
    $http.get('/api/events/' + $stateParams.eventId)
    	.then(function (response) {
    		$scope.eventDetails = response.data;
    		$scope.notifs = response.data.marqueeNotifs;
    	});

    $scope.newNotif = '';
    $scope.createNotif = function (newNotif) {
    	var info = $scope.newNotif;
    	$http.post('/api/marqueeNotifs/' + $stateParams.eventId, { info })
    		.then(function (response) {
    			if(response.status === 201) {
				    $scope.newNotif = '';
				    $scope.notifs.push(response.data);
    				$mdToast.show($mdToast.simple().content('Successfully created').hideDelay(5000));
    			} else {
    				$mdToast.show($mdToast.simple().content('Error occurred. Try again').hideDelay(5000));
    			}
    		});
    };


    $scope.editNotif = function (index, info) {
    	$http.put('/api/marqueeNotifs/' + $scope.notifs[index]._id, { newInfo: info })
    		.then(function (response) {
    			if(response.status === 200) {
    				$scope.notifs[index] = response.data;
    				$mdToast.show($mdToast.simple().content('Successfully saved').hideDelay(5000));
    			} else {
    				$mdToast.show($mdToast.simple().content('Error occurred. Try again').hideDelay(5000));
    			}
    		});
    };

    $scope.deleteNotif = function (index) {
    	$http.delete('/api/marqueeNotifs/' + $scope.notifs[index]._id)
    		.then(function (response) {
    			if(response.status === 204) {
    				$scope.notifs.splice(index, 1);
    				$mdToast.show($mdToast.simple().content('Successfully deleted').hideDelay(5000));
    			} else {
    				$mdToast.show($mdToast.simple().content('Error occurred. Try again').hideDelay(5000));
    			}
    		})
    };

  });
