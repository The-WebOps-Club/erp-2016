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
      formByCategory: function (category) {
        return $http.get('/api/coordForms/dashFormFields' + category).then(function (response) {
          return response.data;
        });
      },
      getForm: function (formId) {
        return $http.get('/api/coordForms/getForm/' + formId).then(function (response) {
          // console.log(response.data);    
          return response.data;
        });            
      },
      getResponse: function (formId) {
        return $http.get('/api/coordForms/getResponse/' + formId).then(function (response) {
          // console.log(response.data);    
          return response.data;
        });            
      },
      formValuesAll: function (category) {
        return $http.get('/api/coordForms/showDepartmentResponses/' + category).then(function (response) {
          // console.log(response.data);    
          return response.data;
        });            
      },
      formsApplied: function () {
        return $http.get('/api/coordForms/dashForms').then(function (response) {
          // console.log(response.data);    
          return response.data;
        });            
      }
  	};
});