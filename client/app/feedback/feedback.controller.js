'use strict';

angular.module('erp2015App')
  .controller('FeedbackCtrl', function ($scope,$state,$http) {

    $scope.submitted = false;
    $scope.selectedItemEvent = null;
    $scope.searchTextEvent = null;

    $scope.events =  $http.get('/api/events/').then(function (response) {
        return response.data;
      });
     
    $scope.users = $http.get('/api/users/').then(function (response) {
        return response.data;
      });

   	$scope.newFeedback = function (form) {
    	$scope.submitted = true;

      if(form.$valid) {
    	  var feedback = {
          eventId: $scope.selectedItemEvent._id,
          userId: $scope.selectedItemUser._id,
          feedback: $scope.feedback.feedback
        }

        $http.post('/api/feedbacks/event/' + feedback.eventId,feedback).then(function(response){
          console.log(response);
        });        
    	}
  	};

  });
