'use strict';

angular.module('erp2015App')
  .service('TDPSubmitService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      getRegObject: function (teamId) {
        return $http.get('/api/registrations/' + teamId).then(function (response) {
          return response.data;
        });
      }
    };
  });
