'use strict';

angular.module('erp2015App')
  .service('fileUpload', ['$http', '$window', '$location', function ($http, $window, $location) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        fd.append('test', 'test');
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
            $window.alert('Successfully uploaded');
            $location.path('http://localhost:3000/coordPortal/dashboard');
        })
        .error(function(){
            $window.alert('Upload failed');
            $location.path('http://localhost:3000/coordPortal/dashboard');
        });
    }
}]);