'use strict';

angular.module('erp2015App')
  .directive('formDirective', function ($http, $state, CoordPortalService) {
    return {
        controller: function ($scope, $upload) {
            $scope.save = function() {
                console.log($scope.form);

                $http.post('/api/coordForms/saveForm', { 
                    formValues: $scope.form.fields,
                    formId: $scope.form.form._id,
                })
                .then(function (message) {
                    $scope.form.saved = true;
                    
                    window.alert("Form Saved!");
                });
                var file = $scope.file;
                $upload.upload({
                    url: 'api/uploads/',
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                });
            };
            // $scope.$watch('files', function () {
            //     console.log('got file');
            //     $scope.upload($scope.files);
            // });

            $scope.upload = function (files) {
                if (files && files.length) {
                    console.log('uplaod file');
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        $upload.http({
                            url: '/api/uploads/',
                            headers : {
                                'Content-Type': file.type
                            },
                            filedield: file
                        })
                        // $upload.upload({
                        //     url: 'api/uploads/',
                        //     method: 'POST',
                        //     // fields: {'form': $scope.form.form._id},
                        //     filefield: file
                        // }).progress(function (evt) {
                        //     var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        //     console.log('progress: ' + progressPercentage + '% ' + evt.config.filefield.name);
                        // }).success(function (data, status, headers, config) {
                        //     console.log('file ' + config.filefield.name + 'uploaded. Response: ' + data);
                        // });
                    }
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
