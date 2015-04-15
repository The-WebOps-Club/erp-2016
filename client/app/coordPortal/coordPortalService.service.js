'use strict';

angular.module('erp2015App')
  .service('CoordPortalService', function CoordPortalService ($http) {

  	return {
  		options:[
  			{
  				name : 'Concept and Design',
  				value : 'concept_and_design',
          subDepts : [ { name : 'da', value: 'sss'}, { name : 'fs', value: 'aaa'} ]
  			},
  			{
  				name : 'Events',
  				value : 'events',
          subDepts : [ { name : 'ss', value: 'asas'}, { name : 'fsf', value: 'xxx'} ]
  			},
  			{
  				name : 'Evolve',
  				value : 'evolve',
          subDepts : [ { name : '', value: ''} ]  			
        },
  			{
  				name : 'Envisage',
  				value : 'envisage',
          subDepts : [ { name : '', value: ''} ]  			
        },
  			{
  				name : 'Finance',
  				value : 'finance',
          subDepts : [ { name : '', value: ''} ]  			
        },
  			{
  				name : 'Facilities',
  				value : 'facilities',
          subDepts : [ { name : '', value: ''} ]          
  			},
  			{
  				name : 'Sponsorship and PR',
  				value : 'sponsorship_and_pr',
          subDepts : [ { name : '', value: ''} ]          
  			},
  			{
  				name : 'Shows(Proshows)',
  				value : 'shows',
          subDepts : [ { name : '', value: ''} ]          
  			},
  			{
  				name : 'Student Relations (SR)',
  				value : 'student_relations',
          subDepts : [ { name : '', value: ''} ]          
  			},
  			{
  				name : 'QMS',
  				value : 'qms',
          subDepts : [ { name : '', value: ''} ]          
  			},
  			{
  				name : 'WebOps and MobOps',
  				value : 'web_and_mob',
          subDepts : [ { name : '', value: ''} ]          
  			}
  		],
      formById: function (id) {
          // $http returns a promise, which has a then function, which also returns a promise
          // if id === 0, this service returns list of all the forms
          return $http.get('/api/coordForms/' + id).then(function (response) {
              var requestedForm = {};
              requestedForm = response.data;
              return requestedForm;
          });
      },
      formByCategory: function (category) {
          // $http returns a promise, which has a then function, which also returns a promise
          return $http.get('/api/coordForms/' + category).then(function (response) {
              // console.log(response.data._id);    
              var requestedForm = {};
              requestedForm = response.data;
              return requestedForm;
          });
      },
      formValues: function (id) {
          // $http returns a promise, which has a then function, which also returns a promise
          return $http.get('/api/coordForms/dashFormValues/' + id).then(function (response) {
              // console.log(response.data);    
              var requestedValues = {};
              requestedValues = response.data;
              return requestedValues;
          });            
      },
      formValuesAll: function (category) {
          // $http returns a promise, which has a then function, which also returns a promise
          return $http.get('/api/coordForms/menuFormValues/' + category).then(function (response) {
              // console.log(response.data);    
              var requestedValues = {};
              requestedValues = response.data;
              return requestedValues;
          });            
      },
      formsApplied: function () {
          // $http returns a promise, which has a then function, which also returns a promise
          return $http.get('/api/coordForms/dashForms').then(function (response) {
              // console.log(response.data);    
              var requestedValues = {};
              requestedValues = response.data;
              return requestedValues;
          });            
      }
  	};
});