'use strict';

angular.module('erp2015App')
  .service('postService', function ($http) {
    return {
    	addComment: function(id,comment){
    		$http.post('/posts/addComment',
    			{postId:id,comment:comment}).then(function(response){
    			return response.data;
    		})
    	},
    	getPosts: function(id,page){
    		$http.get('/posts/'+id+'/'+page).then(function(response){
    			return response.data;
    		})
    	},
    	getNewsFeed: function(page){
			$http.get('/posts/newsfeed/'+page).then(function(response){
    			return response.data;
    		})
    	},
    	acknowledge: function(id){
    		$http.post('/posts/'+id).then(function(response){
    			return response.data;
    		})
    	}
    }
  });
