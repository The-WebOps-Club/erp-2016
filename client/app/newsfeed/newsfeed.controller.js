'use strict';

angular.module('erp2015App')
  .controller('NewsfeedCtrl', function ($scope, $http, $stateParams, $state, socket, Auth, postComment) {
    $scope.newPost = '';
    $scope.newPostTitle = '';
    $scope.posts = {};
	
	$http.get('/api/posts/newsfeed/1')
		.success(function(posts) {
    		$scope.posts = posts;
            socket.syncUpdates('post', $scope.posts);			
        })
        .error(function(err) {
            /*
            Do some error handling here
             */
            console.log(err);
		});

    $scope.addComment = function(post) {
        postComment.addComment(post._id, post.newComment)
            .success(function(data) {
                $scope.newPost = '';
                $scope.newPostTitle = '';
            })
            .error(function(err) {
                console.log(err);
            })
    }
  });
