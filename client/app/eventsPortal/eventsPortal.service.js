'use strict';

angular.module('erp2015App')
  .service('EventsPortalService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      	createEventList:function(data){
        	return $http.post('/api/eventLists', data).then(function(response){
          		return response.data;
        	  	console.log(response.data);
        	});
      	},
  		editEventList: function (data) {
  			return $http.put('/api/eventLists/' + data._id, data).then(function (response) {
  				return response.data;
  			});
  		}
  	};
});
