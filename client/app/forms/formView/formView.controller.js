'use strict';

var FormViewCtrl = angular.module('erp2015App').controller('FormViewCtrl', function ($scope, CoordPortalService, $stateParams, $http) {
    $scope.form = {};
    $scope.getForm = {};
    $scope.getResponse = {};
	CoordPortalService.getForm($stateParams.id).then(function (getForm) {
		$scope.form = getForm;
		// Replacing the $scope.form.form with formId because reponses has formId stored in $scope.form.form
		$scope.form.form = {};
		$scope.form.form._id = getForm._id;
		$scope.form.form.name = getForm.name;
		console.log(getForm);
		CoordPortalService.getResponse($stateParams.id).then(function (getResponse) {
			if(getResponse.form) { $scope.form = getResponse; }
			console.log(getResponse);
		});
	});
});
