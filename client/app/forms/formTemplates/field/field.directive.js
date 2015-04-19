'use strict';

angular.module('erp2015App')
    .directive('fieldDirective', function ($http, $compile) {

        var getTemplateUrl = function(field) {
            var type = field.field_type;
            var templateUrl = '';
// ADD A DEFAULT TEMPLATE HERE IF type DOESN'T MATCH
            switch(type) {
                case 'textfield':
                    templateUrl = 'app/forms/formTemplates/field/textfield.html';
                    break;
                case 'email':
                    templateUrl = 'app/forms/formTemplates/field/email.html';
                    break;
                case 'textarea':
                    templateUrl = 'app/forms/formTemplates/field/textarea.html';
                    break;
                case 'checkbox':
                    templateUrl = 'app/forms/formTemplates/field/checkbox.html';
                    break;
                case 'date':
                    templateUrl = 'app/forms/formTemplates/field/date.html';
                    break;
                case 'dropdown':
                    templateUrl = 'app/forms/formTemplates/field/dropdown.html';
                    break;
                case 'hidden':
                    templateUrl = 'app/forms/formTemplates/field/hidden.html';
                    break;
                case 'password':
                    templateUrl = 'app/forms/formTemplates/field/password.html';
                    break;
                case 'radio':
                    templateUrl = 'app/forms/formTemplates/field/radio.html';
                    break;
            }
            return templateUrl;
        };

        var linker = function(scope, element) {
            // GET template content from path
            var templateUrl = getTemplateUrl(scope.field);
            $http.get(templateUrl).success(function(data) {
                element.html(data);
                $compile(element.contents())(scope);
            });
        };

        return {
            template: '<div>{{field}}</div>',
            restrict: 'E',
            scope: {
                field:'='
            },
            link: linker
        };
  });
