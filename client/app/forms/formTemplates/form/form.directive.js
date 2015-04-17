'use strict';

angular.module('erp2015App')
  .directive('formDirective', function ($http, $state, CoordPortalService) {
    return {
        controller: function ($scope) {
            $scope.save = function() {
                // $scope.form.form_fields_submitted = [];

                // $scope.form.form_fields_submitted = $scope.form.values;
                // $scope.form.form_id_submitted = $scope.form._id;

                console.log($scope.form);

                $http.post('/api/coordForms/saveForm', { 
                    formValues: $scope.form.fields,  
                    formId: $scope.form.form,
                })
                .then(function (message) {
                    $scope.form.saved = true;
                    
                    // Below command is required else hacker can see all the responses submitted through $scope
                    // $scope.form = {};        
                    
                    window.alert(message.data.msg);
                    // why is this not working ???
                    // window.location.reload();
                    // $state.go('coordPortalDashboard');                   
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
