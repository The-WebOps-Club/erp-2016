'use strict';

angular.module('erp2015App')
  .controller('ProfileCtrl', function ($scope, $http, $stateParams, $state, socket, Auth, postComment) {
    $scope.newPost = '';
    $scope.newPostTitle = '';
    $scope.posts = {};

    $http.get('/api/posts/profile/' + $stateParams.userId + '/1')
    	.success(function(posts) {
    		$scope.posts = posts;
            socket.syncUpdates('post', $scope.posts);
    	})
    	.error(function(err) {
    		/*
    		Do some error handling here
    		 */
    		console.log(err);
            $state.go('404');
    	});

    $scope.createPost = function() {
        postComment.createPost('profile', $scope.newPostTitle, $scope.newPost, $stateParams.userId)
            .success(function(data) {
                socket.syncUpdates('post', $scope.posts);
                /*
                Check this shit...sorting is fucked up
                 */
                $scope.newPost = '';
                $scope.newPostTitle = '';
            })
            .error(function(err) {
                console.log(err);
            })
    }

    $scope.addComment = function(post) {
        postComment.addComment(post._id, post.newComment)
            .success(function(data) {
                socket.syncUpdates('post', $scope.posts);
                $scope.newPost = '';
                $scope.newPostTitle = '';
            })
            .error(function(err) {
                console.log(err);
            })
    }   


    // $scope.createPost = function() {
    // 	$http.post('/api/posts/createPost', { type: 'profile', title: $scope.newPostTitle, info: $scope.newPost, stateParams: $stateParams })
    // 		.success(function(data) {
    //             socket.syncUpdates('post', $scope.posts);
    //             $scope.newPost = '';
    //             $scope.newPostTitle = '';
    // 		})
    // 		.error(function(err) {
    // 			/*
    // 			Do some error handling here
    // 			 */
    // 			console.log(err);
    // 		});
    // }

    // $scope.addComment = function(post) {
    //     $http.post('/api/posts/addComment', { type: 'profile', postId: post._id, comment: post.newComment })
    //         .success(function(data) {
    //             post.newComment = '';
    //             socket.syncUpdates('post', $scope.posts);
    //             console.log(socket.syncUpdates('post', $scope.posts));
    //             $scope.posts.sort(function(a, b) {
    //                 a = new Date(a.updatedOn);
    //                 b = new Date(b.updatedOn);
    //                 return a>b ? -1 : a<b ? 1 : 0;
    //             });
    //         })
    //         .error(function(err) {
    //             /*
    //             Do some error handling here
    //              */
    //             console.log(err);
    //         });
    // }  	



  });
