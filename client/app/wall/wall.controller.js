'use strict';

angular.module('erp2015App')
  .controller('WallCtrl', function ($scope, $http, $stateParams, socket) {
    $scope.newPost = '';
    $scope.newPostTitle = '';
    $scope.posts = {};

    $http.get('/api/posts?type=' + $stateParams.type + '&dept=' + $stateParams.dept + '&subDept=' + $stateParams.subDept
        + '&id=' + $stateParams.id)
    	.success(function(posts) {
    		$scope.posts = posts;
            socket.syncUpdates('post', $scope.posts);
            $scope.posts.sort(function(a, b) {
                a = new Date(a.updatedOn);
                b = new Date(b.updatedOn);
                return a>b ? -1 : a<b ? 1 : 0;
            });
    	})
    	.error(function(err) {
    		/*
    		Do some error handling here
    		 */
    		console.log(err);
    	});

    $scope.createPost = function() {
    	$http.post('/api/posts/createPost', { title: $scope.newPostTitle, info: $scope.newPost, stateParams: $stateParams })
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

    $scope.addComment = function(post) {
        $http.post('/api/posts/addComment', { postId: post._id, comment: post.newComment })
            .success(function(data) {
                post.newComment = '';
                socket.syncUpdates('post', $scope.posts);
            })
            .error(function(err) {
                /*
                Do some error handling here
                 */
                console.log(err);
            });
    }
  });
