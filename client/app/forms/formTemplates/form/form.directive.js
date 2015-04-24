'use strict';

angular.module('erp2015App')
  .directive('formDirective', function ($http, $state, CoordPortalService) {
    return {
        controller: function ($scope, $upload) {
            $scope.save = function() {
                console.log($scope.form);
                if($scope.file) {
                    if($scope.form.fileId) $http.delete('api/uploads/'+$scope.form.fileId+'/');
                    var file = $scope.file;
                    $upload.upload({
                        url: 'api/uploads/',
                        file: file
                    }).progress(function (evt) {
                        $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.file.name);
                    }).success(function (data, status, headers, config) {
                        console.log(data.fileId);
                        $http.post('/api/coordForms/saveForm', { 
                            formValues: $scope.form.fields,
                            formId: $scope.form.form._id,
                            fileId: data.fileId,
                        })
                        .then(function (message) {
                            $scope.form.saved = true;
                            window.alert(data.message);
                        });
                    });
                }
                else{
                    $http.post('/api/coordForms/saveForm', { 
                        formValues: $scope.form.fields,
                        formId: $scope.form.form._id,
                    })
                    .then(function (message) {
                        $scope.form.saved = true;
                        
                        window.alert(message);
                    });
                }
            };
        },
        templateUrl: 'app/forms/formTemplates/form/form.html',
        restrict: 'E',
        scope: {
            form:'='
        }
    };
  });
