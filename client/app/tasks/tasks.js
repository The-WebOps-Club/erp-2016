'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tasks', {
        url: '/tasks',
        templateUrl: 'app/tasks/tasks.html',
        controller: 'TasksCtrl',
		    // data: {
	     //    permissions: {
      //   	  	except: ['anonymous', 'admin', 'user', 'core'],
      //     		redirectTo: 'coordPortalDashboard'
			   //  }        
      //   }        
      });
  });