'use strict';

angular.module('erp2015App')
  .service('FormService', function FormService($http) {

    return {
        fields:[
            {
                name : 'Textfield',
                value : 'textfield'
            },
            {
                name : 'E-mail',
                value : 'email'
            },
            {
                name : 'Password',
                value : 'password'
            },
            {
                name : 'Radio Buttons',
                value : 'radio'
            },
            {
                name : 'Dropdown List',
                value : 'dropdown'
            },
            {
                name : 'Date',
                value : 'date'
            },
            {
                name : 'Text Area',
                value : 'textarea'
            },
            {
                name : 'Checkbox',
                value : 'checkbox'
            },
            {
                name : 'Hidden',
                value : 'hidden'
            }
        ]
        //  forms: function() {
        //     return $http.get(formsJsonPath).then(function (response) {
        //         return response.data;
        //     });
        // }
    };
});
