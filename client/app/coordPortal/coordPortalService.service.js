'use strict';

angular.module('erp2015App')
  .service('CoordPortalService', function CoordPortalService ($http) {

  	return {
      hostels:[
        {
          name : 'Alakananda',
          value : 'alakananda'
        },      
        {
          name : 'Brahmaputra',
          value : 'brahmaputra'
        },
        {
          name : 'Cauvery',
          value : 'cauvery'
        },
        {
          name: 'Godavari',
          value: 'godavari'
        },
        {
          name : 'Ganga',
          value : 'ganga'
        },        
        {
          name : 'Jamuna',
          value : 'jamuna'
        },        
        {
          name : 'Krishna',
          value : 'krishna'
        },
        {
          name : 'Mandakini',
          value : 'mandakini'
        },
        {
          name : 'Mahanadi',
          value : 'mahanadi'
        },
        {
          name : 'Narmada',
          value : 'narmada'
        },
        {
          name : 'Pampa',
          value : 'pampa'
        },
        {
          name : 'Saraswathi',
          value : 'saraswathi'
        },
        {
          name : 'Sabarmathi',
          value : 'sabarmathi'
        },
        {
          name: 'Sindhu',
          value: 'sindhu'
        },
        {
          name : 'Sharavati',
          value : 'sharavati'
        },
        {
          name : 'Sarayu',
          value : 'sarayu'
        },
        {
          name : 'Sarayu - Extension',
          value : 'sarayuExtension'
        },
        {
          name : 'Tharmirapani',
          value : 'thamiriapani'
        },
        {
          name : 'Tapti',
          value : 'tapti'
        },
        {
          name: 'Day Scholar',
          value: 'dayScholar'
        }
      ],      
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
      },

      getFilesFromDepartment: function(department){
        return $http.get('http://localhost:9000/api/imgs/' + department).then(function (response){
          return response.data;
        });
      },

      downloadFile: function(department, file){
        return $http.get('http://localhost:9000/api/imgs/' + department + '/' + file).then(function (response){
          return response.data;
        });
      },

      userAppliedFor: function (id) {
        return $http.get('/api/coordForms/allForms/' + id).then(function (response) {
          // console.log(response.data);    
          return response.data;
        });            
      }
  	};
});