'use strict';

angular.module('erp2015App')
  .directive('formDirective', function ($http, $state, CoordPortalService) {
    return {
        controller: function ($scope, $stateParams, $window, Upload, fileUpload) {

            // console.log($stateParams.fullName);
            $scope.fullPath = "/api/uploads/" + $stateParams.fullName;
            $scope.separate = $stateParams.fullName.split(" | ");
            $scope.department = $scope.separate[0];
            $scope.subDepartment = $scope.separate[1];
            $scope.type = $scope.separate[2];
            // console.log($scope.department);

            $scope.submit = function(){ //function to call on form submit

              var file = $scope.file;
              console.log('file is ' );
              console.dir(file);
              var uploadUrl = "http://localhost:9000/api/imgs/" + $scope.department;
              fileUpload.uploadFileToUrl(file, uploadUrl);

                // if ($scope.form.file.$valid && $scope.file) {
                //   $scope.upload($scope.file);
                // }
            }
    
            $scope.upload = function (file) {
              Upload.upload({
                url: 'http://localhost:9000/api/uploads', //webAPI exposed to upload the file
                data:{file:file, 'username': 'Minu'} //pass file as data, should be user ng-model
              }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                  $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                } else {
                  $window.alert('an error occured');
                }
              }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
              }, function (evt) { 
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                //vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
              });
            };
            

            $scope.save = function() {
                console.log(vm);
            };
        },
        templateUrl: 'app/forms/formTemplates/form/form.html',
        restrict: 'E',
        scope: {
            form:'='
        }
    };
  });