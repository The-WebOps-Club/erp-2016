'use strict';

angular.module('erp2015App')
  .service('postComment', function ($http, $stateParams) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
	    createPost: function (title, info, destination) {
	    	return $http.post('/api/posts/', {title: title, info: info, destId: destination })
	    		.success(function(data) {
	    			return data;
	    		})
	    		.error(function(err) {
	    			/*
	    			Do some error handling here
	    			 */
	    			console.log(err);
	    			return err;
	    		});
	    },
	    addComment: function (postId, comment) {
	        return $http.post('/api/posts/addComment', { postId: postId, comment: comment })
	            .success(function(data) {
	                return data;
	            })
	            .error(function(err) {
	                /*
	                Do some error handling here
	                 */
	                console.log(err);
	            });    	
	    }
	}
  });
