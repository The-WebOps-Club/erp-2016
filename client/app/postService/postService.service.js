'use strict';

angular.module('erp2015App')
  .service('postService', function ($http) {
    return {
        addPost: function(title,info,wall){
            return $http.post('/api/posts/',
    			{destId:wall,title:title,info:info}).then(function(response){
    			return response.data;
    		})
        },
    	addComment: function(id,comment){
    		return $http.post('/api/posts/addComment',
    			{postId:id,comment:comment}).then(function(response){
    			return response.data;
    		})
    	},
    	getWallPosts: function(id,page){
    		return $http.get('/api/posts/'+id+'/'+page).then(function(response){
    			return response.data;
    		})
    	},
    	getNewsFeed: function(page){
			return $http.get('/api/posts/newsfeed/'+page).then(function(response){
    			return response.data;
    		})
    	},
    	acknowledge: function(id){
    		return $http.post('/api/posts/'+id).then(function(response){
    			return response.data;
    		})
    	}
    }
  });
