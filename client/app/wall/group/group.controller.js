'use strict';

angular.module('erp2015App')
  .controller('GroupCtrl', function ($scope,$filter, $http, $stateParams, $state, socket, Auth, postComment, group, users) {
    // console.log(user);
    $scope.editMode = false;
    $scope.newPost = {
        title: "",
        info: ""
    };
    $scope.posts = [];
    $scope.group = group.data;
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
    console.log(users.data);
    $scope.load=function(){
        $scope.count=$scope.count+1;
        $http.get('/api/posts/' + $scope.group.wall + '/'+$scope.count)
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
        postComment.createPost($scope.newPost.title, $scope.newPost.info, $scope.group._id)
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
    // self.allContacts = users.data;
    $scope.contacts = users.data;
    // self.contacts = users.data;
    $scope.filterSelected = true;
    $scope.selectedContacts = [];

    $scope.querySearch = function (input){
        $scope.names = $filter('filter')($scope.contacts,{name:input}); 
        $scope.inputName=input;
        return $scope.names;
   }
     
     $scope.submitted=function(){
        for (var i = 0; i < $scope.selectedContacts.length; i++) {
            $http.post('api/users/addGroup/', {user: $scope.selectedContacts[i]._id, group: $scope.group._id, role: "coords"})
        };
        $scope.selectedContacts=[];
     }
  });


