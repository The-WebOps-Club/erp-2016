'use strict';

var FormViewCtrl = angular.module('erp2015App').controller('FormViewCtrl', function ($scope, FormService, $stateParams, $http) {
    $scope.form = {};
	// read form with given id
	FormService.formById($stateParams.id).then(function(form) {
		$scope.form = form;
		// console.log(form);
	});
});
