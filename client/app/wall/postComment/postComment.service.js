'use strict';

angular.module('erp2015App')
  .service('postComment', function ($http, $stateParams) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
	    createPost: function (type, title, info, stateParams) {
	    	return $http.post('/api/posts/createPost', { type: type, title: title, info: info, stateParams: stateParams })
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
	    addComment: function (type, postId, comment) {
	        return $http.post('/api/posts/addComment', { type: type, postId: postId, comment: comment })
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
