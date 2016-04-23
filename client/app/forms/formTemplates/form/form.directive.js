'use strict';

angular.module('erp2015App')
  .directive('formDirective', function ($http, $state, CoordPortalService) {
    return {
        controller: function ($scope, $stateParams, $window, Upload, fileUpload) {

            // console.log($stateParams.fullName);
            $scope.fullPath = "/api/uploads/" + $stateParams.fullName;
            $scope.separate = $stateParams.fullName.split(" | ");
            $scope.department = $scope.separate[0];
            $scope.departmentWithSpace = $scope.department.split(/(?=[A-Z])/).join(" ");
            $scope.subDepartment = $scope.separate[1];
            $scope.type = $scope.separate[2];
            // console.log($scope.department);
            $scope.questionLink = '';
            
            if($scope.department == 'TechOps'){
              $scope.questionLink = 'https://drive.google.com/folderview?id=0B6SOgNBnd4yENlhOczBCLUQ0S1E&usp=sharing&tid=0B6SOgNBnd4yEM2ppQWxLclowZHc';
            }
            else if ($scope.department == 'Design'){
              $scope.questionLink = 'https://drive.google.com/folderview?id=0B6SOgNBnd4yEVUtXNG9HeUNob2M&usp=sharing&tid=0B6SOgNBnd4yEM2ppQWxLclowZHc';
            }
            else if ($scope.department == 'Evolve'){
              $scope.questionLink = 'https://drive.google.com/folderview?id=0B6SOgNBnd4yEcldGVks0Sk5XMXc&usp=sharing&tid=0B6SOgNBnd4yEM2ppQWxLclowZHc';
            }
            else if ($scope.department == 'Envisage'){
              $scope.questionLink = 'https://drive.google.com/folderview?id=0B6SOgNBnd4yENXlFLUlLUlRiTGc&usp=sharing&tid=0B6SOgNBnd4yEM2ppQWxLclowZHc';
            }
            else if ($scope.department == 'MediaAndStudentRelations'){
              $scope.questionLink = 'https://drive.google.com/folderview?id=0B6SOgNBnd4yENGZXa0piWl9CWUk&usp=sharing&tid=0B6SOgNBnd4yEM2ppQWxLclowZHc';
            }
            else if ($scope.department == 'Events'){
              $scope.questionLink = 'https://drive.google.com/folderview?id=0B6SOgNBnd4yEU0FjWEN0Q2JyZjg&usp=sharing&tid=0B6SOgNBnd4yEM2ppQWxLclowZHc';
            }
            else if ($scope.department == 'QMS'){
              $scope.questionLink = 'https://drive.google.com/folderview?id=0B6SOgNBnd4yEVXJsRThTWF9oLW8&usp=sharing&tid=0B6SOgNBnd4yEM2ppQWxLclowZHc';
            }
            else if ($scope.department == 'ShowsAndExhibitions'){
              $scope.questionLink = 'https://drive.google.com/folderview?id=0B6SOgNBnd4yEVDJ5blc5ejJlMTg&usp=sharing&tid=0B6SOgNBnd4yEM2ppQWxLclowZHc';
            }
            else if ($scope.department == 'Facilities'){
              $scope.questionLink = 'https://drive.google.com/folderview?id=0B6SOgNBnd4yEZUhWbDh0aHpJS28&usp=sharing&tid=0B6SOgNBnd4yEM2ppQWxLclowZHc';
            }
            else if ($scope.department == 'Finance'){
              $scope.questionLink = 'https://drive.google.com/folderview?id=0B6SOgNBnd4yEeUpkdEZyQ0xtWXM&usp=sharing&tid=0B6SOgNBnd4yEM2ppQWxLclowZHc';
            }
            else if ($scope.department == 'Sponsorship'){
              $scope.questionLink = 'https://drive.google.com/folderview?id=0B6SOgNBnd4yEVDJvYnlEd3YyMXc&usp=sharing&tid=0B6SOgNBnd4yEM2ppQWxLclowZHc';
            }

            $scope.submit = function(){ //function to call on form submit

              var file = $scope.file;
              console.log('file is ' );
              console.dir(file);
              var uploadUrl = "http://cfi.iitm.ac.in:3000/api/imgs/" + $scope.department;
              fileUpload.uploadFileToUrl(file, uploadUrl);

                // if ($scope.form.file.$valid && $scope.file) {
                //   $scope.upload($scope.file);
                // }
            }
    
            $scope.upload = function (file) {
              Upload.upload({
                url: 'http://cfi.iitm.ac.in:3000/api/uploads', //webAPI exposed to upload the file
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