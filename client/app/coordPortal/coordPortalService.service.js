'use strict';

angular.module('erp2015App')
  .service('CoordPortalService', function CoordPortalService ($http) {

  	return {
      options: function () {
        return $http.get('/api/coordForms/').then(function (response) {
          return response.data;
        });
      },
      formById: function (id) {
        return $http.get('/api/coordForms/' + id).then(function (response) {
          return response.data;
        });
      },
      formByDepartment: function (department) {
        return $http.get('/api/coordForms/department/' + department).then(function (response) {
          return response.data;
        });
      },
      getForm: function (formId) {
        return $http.get('/api/coordForms/getForm/' + formId).then(function (response) {
          // console.log(response.data);    
          return response.data;
        });            
      },
      getResponse: function (responseId) {
        return $http.get('/api/coordForms/getResponse/' + responseId).then(function (response) {
          // console.log(response.data);    
          return response.data;
        });            
      },
      showResponse: function (responseId) {
        return $http.get('/api/coordForms/showResponse/' + responseId).then(function (response) {
          // console.log(response.data);    
          return response.data;
        });            
      },
      formResponses: function (formId) {
        return $http.get('/api/coordForms/showResponses/' + formId).then(function (response) {
          // console.log(response.data);    
          return response.data;
        });            
      },
      formsApplied: function () {
        return $http.get('/api/coordForms/myForms').then(function (response) {
          // console.log(response.data);    
          return response.data;
        });            
      }
  	};
});