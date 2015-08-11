'use strict';

angular.module('erp2015App')
  .controller('ProfileCtrl', function ($scope, $http, $stateParams, $state, socket, Auth, postComment, user) {
    console.log(user);
    $scope.editMode = false;
    $scope.newPost = '';
    $scope.newPostTitle = '';
    $scope.posts = [];
    $scope.user = user.data;
    // $scope.user={
    //         name:"name",
    //         image: "url_for_image",
    //         date_of_birth: "00/00/0000",
    //         email:"email",
    //         college:"college",
    //         rollNumber:"AA11A111",
    //         room_no:"room no",
    //         hostel:"Ganga",
    //     }
    $scope.count=0;
    console.log($scope.user);
    $scope.load=function(){
        $scope.count=$scope.count+1;
        $http.get('/api/posts/' + $scope.user.wall + '/'+$scope.count)
        	.success(function(posts) {
        		$scope.posts=$scope.posts.concat(posts);
                socket.syncUpdates('post', $scope.posts);
        	})
        	.error(function(err) {
        		/*
        		Do some error handling here
        		 */
        		console.log(err);
        	});
    
    }

    $scope.edit = function()
    {
        $scope.editMode = true; 
    }
    $scope.view = function()
    {
        $scope.editMode = false;
    }
    
    $scope.createPost = function() {
        postComment.createPost('profile', $scope.newPostTitle, $scope.newPost, $scope.user.wall)
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

