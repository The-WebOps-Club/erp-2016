'use strict';

angular.module('erp2015App')
  .controller('WallCtrl', function ($scope, $http, $stateParams, socket) {
    $scope.message = 'Hello';
    $scope.newPost = '';
    $scope.newPostTitle = '';
    $scope.newComment = [];
    $scope.posts = {};

    $http.get('/api/posts?type=' + $stateParams.type + '&dept=' + $stateParams.dept + '&subDept=' + $stateParams.subDept)
    	.success(function(posts) {
    		$scope.posts = posts;
            socket.syncUpdates('post', $scope.posts, function(event, post, posts) {
                /*
                What is this doing ???
                 */
                posts.sort(function(a, b) {
                    a = new Date(a.date);
                    b = new Date(b.date);
                    return a<b ? -1 : a>b ? 1 : 0;
                });
            });
    	})
    	.error(function(err) {
    		/*
    		Do some error handling here
    		 */
    		console.log(err);
    	});

    $scope.createPost = function() {
    	$http.post('/api/posts', { title: $scope.newPostTitle, info: $scope.newPost, stateParams: $stateParams })
    		.success(function(data) {
    			$scope.newPost = '';
    			$scope.newPostTitle = '';
    		})
    		.error(function(err) {
    			/*
    			Do some error handling here
    			 */
    			console.log(err);
    		});
    }	
  });
