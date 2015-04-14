'use strict';

angular.module('erp2015App')
  .controller('SubDepartmentCtrl', function ($scope, $http, $stateParams, $state, socket, Auth, postComment) {
    $scope.newPost = '';
    $scope.newPostTitle = '';
    $scope.posts = {};
	
	$http.get('/api/posts/subDepartment/' + $stateParams.subDeptId)
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
            $state.go('404');
		});

    $scope.createPost = function() {
        postComment.createPost('subDepartment', $scope.newPostTitle, $scope.newPost, $stateParams.subDeptId)
            .success(function(data) {
                socket.syncUpdates('post', $scope.posts);
                /*
                Check this shit...sorting is fucked up
                 */
            $scope.posts.sort(function(a, b) {
                a = new Date(a.updatedOn);
                b = new Date(b.updatedOn);
                return a<b ? -1 : a>b ? 1 : 0;
            });

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

  });
