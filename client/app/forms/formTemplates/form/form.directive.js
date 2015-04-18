'use strict';

angular.module('erp2015App')
  .directive('formDirective', function ($http, $state, CoordPortalService) {
    return {
        controller: function ($scope) {
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
            };
        },
        templateUrl: 'app/forms/formTemplates/form/form.html',
        restrict: 'E',
        scope: {
            form:'='
        }
    };
  });
