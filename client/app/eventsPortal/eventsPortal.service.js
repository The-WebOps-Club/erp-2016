'use strict';

angular.module('erp2015App')
  .service('EventsPortalService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      	createEventList:function(data){
        	return $http.post('/api/eventLists', data).then(function(response){
          		return response.data;
        	});
      	},
        getEventList: function (eventListId) {
          return $http.get('api/eventLists/' + eventListId).then(function (response) {
            return response.data;
          });
        },
  		  editEventList: function (data) {
  			  return $http.put('/api/eventLists/' + data._id, data).then(function (response) {
  				  return response.data;
  			  });
  		  },
        getAllEventLists: function () {
          return $http.get('/api/eventLists').then(function (response) {
            return response.data;
          });
        }
  	};
});
