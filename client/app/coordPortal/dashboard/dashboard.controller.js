'use strict';

angular.module('erp2015App')
  // .controller('CoordPortalDashboardCtrl', function ($scope, $location, $http, CoordPortalService, Auth, FileUploader) {
  .controller('CoordPortalDashboardCtrl', function ($scope, $location, $http, CoordPortalService, Auth) {

    // $scope.uploader = new FileUploader({
    //   url: '/api/forms/upload'
    // });

    $scope.allForms = '';
    $scope.preference = '';
    $scope.updated = false;
    $scope.form = {};
    $scope.message = {};
    
    // checking if already applied or not
    if(Auth.isLoggedIn()) {
      if(Auth.getCurrentUser().formApplied) {
        $scope.applying = Auth.getCurrentUser().formApplied;
        $scope.updated = true;
      }
    } else {
      $location.path('/login');
    }

    // loading all the departments available
    $scope.options = CoordPortalService.options;

    // // loading the corresponding form details
    // if($scope.updated) {
    //   console.log($scope.applying);
    //   CoordPortalService.formByCategory($scope.applying).then(function (form) {
        
    //     $scope.form = form;

    //     // checking if 'form' is existing and the value is zero or not
    //     if(form._id) {
    //       $scope.formPresent = 1;
    //     } else {
    //       $scope.formPresent = 0;
    //     }
    //     // console.log(form);
    //   }); 
    // } else {
    //   $scope.form = {};
    // }

    // loading all the forms
    CoordPortalService.formById(0).then(function(responses) {
      if(responses.length !== 0) {
        $scope.allForms = responses;
        // console.log(responses);
        // there is some cup here see !!!!
        // socket.syncUpdates('form', $scope.allForms);
      } else {
        $scope.allForms = '';
      }
    });

    // loading all the forms applied by user
    CoordPortalService.formsApplied().then(function(responses) {
      if(responses.length !== 0) {
        $scope.formsApplied = responses;
        // console.log(responses);
        // socket.syncUpdates('form', $scope.allForms);
      } else {
        $scope.formsApplied = '';
      }
    });

    // // loading the submitted values
    // if($scope.updated) {
    //   CoordPortalService.formValues($scope.applying).then(function (responses) {
    //     $scope.formResponses = responses;
    //   });
    // } else {
    //   $scope.formResponses = '';
    // }
      
    $scope.updateUser = function() {
      if($scope.applying && Auth.getCurrentUser()._id) {
        $http.post('/api/users/update', { id: Auth.getCurrentUser()._id, applying: $scope.applying })
          .success(function(message) {
            // console.log(message);
            $scope.message = message;
          })
          .error(function(message) {
            $scope.message = message;
          });

        $scope.updated = true;
        window.location.reload();
      } else {
        window.alert('Please select your preference!')
      }
    };

    $scope.emptyAlerts = function() {
      $scope.message = {};
    };
  });
