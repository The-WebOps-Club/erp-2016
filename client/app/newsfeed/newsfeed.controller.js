'use strict';

angular.module('erp2015App')
  .controller('NewsfeedCtrl', function ($scope, $http, $stateParams, $state, socket, Auth, postComment, postService) {
    $scope.newPost = '';
    $scope.newPostTitle = '';
    $scope.posts = {};
	
	// $http.get('/api/posts/newsfeed/1')
	// 	.success(function(posts) {
 //    		$scope.posts = posts;
 //            socket.syncUpdates('post', $scope.posts);			
 //        })
 //        .error(function(err) {
 //            /*
 //            Do some error handling here
 //             */
 //            console.log(err);
 //            $state.go('404');
	// 	});
    $scope.updateFeed=function(){
        postService.getNewsFeed($scope.page).then(function(data){
            $scope.posts=data;
        })
    }
    $scope.page=1;
    $scope.updateFeed();
    $scope.addComment = function(post) {
        postService.addComment(post._id,post.newComment).then(function(data){
            var idx=$scope.posts.indexOf(post)
            $scope.posts[idx]=data
            $scope.posts[idx]['modified']=true
            console.log(idx)
        })
    }
  });
