'use strict';

angular.module('erp2015App')
  .controller('TdpCreationCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.saveJson = function(Json){
    	console.log(Json);
    }
  });
