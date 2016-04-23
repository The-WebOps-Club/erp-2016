'use strict';

angular.module('erp2015App')
  // .controller('CoordPortalDashboardCtrl', function ($scope, $location, $http, CoordPortalService, Auth, FileUploader) {
  .controller('CoordPortalDashboardCtrl', function ($scope, $state, $location, $http, $facebook, CoordPortalService, Auth) {

    $scope.getCurrentUser = Auth.getCurrentUser;
    if ($scope.getCurrentUser().role === 'core')
      $state.go('coordPortalCoresCtrl');
    if (!$scope.getCurrentUser())
      $state.go('LoginCtrl');

    $scope.allForms = [
    {name: 'Design', value: 'Design'},
    {name: 'Envisage', value: 'Envisage'},
    {name: 'Events', value: 'Events'},
    {name: 'Evolve', value: 'Evolve'},
    {name: 'Facilities', value: 'Facilities'},
    {name: 'Finance', value: 'Finance'},
    {name: 'Media And Student Relations', value: 'MediaAndStudentRelations'},
    {name: 'QMS', value: 'QMS'},
    {name: 'Shows And Exhibitions', value: 'ShowsAndExhibitions'},
    {name: 'Sponsorship And PR', value: 'Sponsorship'},
    {name: 'TechOps', value: 'TechOps'}
    ];
    $scope.preference = '';
    $scope.form = {};
    $scope.message = {};

    // CoordPortalService.options().then(function (responses) {
    //   if(responses.length !== 0) {
    //     $scope.allForms = responses;
    //   } else {
    //     $scope.allForms = '';
    //   }
    // });

    // loading all the forms applied by user
    CoordPortalService.formsApplied().then(function (responses) {
      if(responses.length !== 0) {
        $scope.formsApplied = responses;
        console.log(responses);
      } else {
        $scope.formsApplied = '';
      }
    });

    // delete the application to a form
    $scope.deleteApp = function(id) {
      console.log(id);
      $http.post('/api/coordForms/deleteApp', { formId: id })
        .success(function (response) {
          console.log(response);
          $state.reload();
        })
        .error(function (err) {
          console.log(err);
        });
    };

    $scope.emptyAlerts = function() {
      $scope.message = {};
    };
  });
