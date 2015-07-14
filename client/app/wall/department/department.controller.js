'use strict';

angular.module('erp2015App')
  .controller('DepartmentCtrl', function ($scope, $http, $stateParams, $state, socket, Auth, postService) {
    $scope.newPost = '';
    $scope.newPostTitle = '';
    $scope.posts = {};
    $scope.page=1;
    console.log($stateParams)
    $http.get('/api/departments/'+$stateParams.deptId)
        .then(function(res) {
            $scope.department = res.data;
            $scope.wall=$scope.department.wall;
            console.log($scope.department)
            if ($scope.wall)
                $scope.updatePosts()
        })
        .catch(function(err) {
            console.log(err);
            $state.go('404');
        });
    $scope.updatePosts=function(){
        postService.getWallPosts($scope.wall,$scope.page)
    		.then(function(posts) {
                console.log('got posts '+posts.length)
        		$scope.posts = posts;
                socket.syncFilterUpdates('post', $scope.posts,function(post){
                    return post.wall==$scope.wall
                });
            })
            .catch(function(err) {
                /*
                Do some error handling here
                 */
                console.log(err);
                $state.go('404');
    		});
    }


    $scope.createPost = function() {
        postService.addPost($scope.newPostTitle, $scope.newPost, $stateParams.deptId)
            .then(function(data) {
                $scope.newPost = '';
                $scope.newPostTitle = '';
            })
            .catch(function(err) {
                console.log(err);
            })
    }

    $scope.addComment = function(post) {
        postService.addComment(post._id,post.newComment).then(function(data){
            //add sockets for comments
            $scope.updatePosts()
        })
    }

  });
