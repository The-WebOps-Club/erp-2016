'use strict';

angular.module('erp2015App')
  .controller('DepartmentCtrl', function ($scope,$filter, $http, $stateParams, $state, socket, Auth, postComment, department, users) {
    $scope.editMode = false;
    $scope.newPost = {
        title: "",
        info: ""
    };
    $scope.posts = [];
    $scope.department = department.data;
    $scope.count=0;
    console.log(users.data);
    $scope.load=function(){
        $scope.count=$scope.count+1;
        $http.get('/api/posts/' + $scope.department.wall + '/'+$scope.count)
            .success(function(posts) {
                $scope.posts=$scope.posts.concat(posts);
                socket.syncUpdates('post', $scope.posts);
            })
            .error(function(err) {
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
        postComment.createPost($scope.newPost.title, $scope.newPost.info, $scope.department._id)
            .success(function(data) {
                socket.syncUpdates('post', $scope.posts);
                $scope.newPost.title = '';
                $scope.newPost.info = '';
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

    
    var self = this;
    self.querySearch = $scope.querySearch;
    self.profilePicConsstructor = $scope.profilePicConsstructor;
    $scope.contacts = users.data;
    $scope.filterSelected = true;
    $scope.selectedContacts = [];

    $scope.querySearch = function (input){
        $scope.names = $filter('filter')($scope.contacts,{name:input});
        $scope.inputName=input;
        for (var i = 0; i < $scope.names.length; i++){
            $scope.names[i].profilePic = "/api/users/" + $scope.names[i]._id + "/profilePic";
        }
        return $scope.names;
   }
     
     $scope.submitted=function(){
        for (var i = 0; i < $scope.selectedContacts.length; i++) {
            $http.post('api/users/addDepartment/', {user: $scope.selectedContacts[i]._id, department: $scope.department._id, role: "coords"})
                .success(function (data) {
                    // body...
                })
        };

        $scope.selectedContacts=[];
     }
  });


