'use srict';

angular.module('erp2015App')
	.service('Task',function($resource){
		return $resource('/api/tasks/:id',{
			id:'@_id'
		})
	})
