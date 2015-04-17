'use strict';

angular.module('erp2015App')
  .service('CoordPortalService', function CoordPortalService ($http) {

  	return {
      options: function () {
        return $http.get('/api/coordForms/').then(function (response) {
          var requestedForm = {};
          requestedForm = response.data;
          return requestedForm;
        });
      },
      formById: function (id) {
          return $http.get('/api/coordForms/' + id).then(function (response) {
            var requestedForm = {};
            requestedForm = response.data;
            return requestedForm;
          });
      },
      formByCategory: function (category) {
          return $http.get('/api/coordForms/dashFormFields' + category).then(function (response) {
            var requestedForm = {};
            requestedForm = response.data;
            return requestedForm;
          });
      },
      formValues: function (id) {
          return $http.get('/api/coordForms/dashFormValues/' + id).then(function (response) {
              // console.log(response.data);    
              var requestedValues = {};
              requestedValues = response.data;
              return requestedValues;
          });            
      },
      formValuesAll: function (category) {
          return $http.get('/api/coordForms/showDepartmentResponses/' + category).then(function (response) {
              // console.log(response.data);    
              var requestedValues = {};
              requestedValues = response.data;
              return requestedValues;
          });            
      },
      formsApplied: function () {
          return $http.get('/api/coordForms/dashForms').then(function (response) {
              // console.log(response.data);    
              var requestedValues = {};
              requestedValues = response.data;
              return requestedValues;
          });            
      }
  	};
});