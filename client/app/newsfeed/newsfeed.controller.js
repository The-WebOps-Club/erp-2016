'use strict';

angular.module('erp2015App')
  .controller('NewsfeedCtrl', function ($scope, $http, $stateParams, $state, socket, Auth, postService) {
    $scope.newPost = '';
    $scope.newPostTitle = '';
    $scope.posts = [];

    $scope.load=function(){
        postService.getNewsFeed($scope.page).then(function(data){
            $scope.posts=$scope.posts.concat(data);
        })
        $scope.page++
    }
    $scope.page=1;
    $scope.load();
    $scope.addComment = function(post) {
        postService.addComment(post._id,post.newComment).then(function(data){
            //add sockets for comments
            $scope.updatePosts()
        })
    }
  });
