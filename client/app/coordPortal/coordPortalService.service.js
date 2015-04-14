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
          subDepts : [ { name : '', value: ''} ]
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
  		]
  	};
});