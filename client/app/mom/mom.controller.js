'use strict';

angular.module('erp2015App')
  .controller('MomCtrl', function ($scope,$http,$window) {
    $scope.message = 'Hello';
    $http.get('/api/moms/55d00e2569411bda08c3d6fd', {responseType: 'arraybuffer'})
            .success(function(data) {
            	
                $scope.file = new Blob([data], {type: 'application/pdf'});
                $scope.fileURL = URL.createObjectURL($scope.file);
                console.log($scope.fileURL);
                window.open($scope.fileURL);
            })
            .error(function(err) {
                /*
                Do some error handling here
                 */
                console.log(err);
            });
    
  });
