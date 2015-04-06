'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      /*
      State 'wall' must show ----complete it----
       */
      .state('wall', {
        url: '/wall/{type}?dept&subDept&id',
        templateUrl: 'app/wall/wall.html',
        controller: 'WallCtrl',
        onEnter: function($stateParams, $state) {
          event.preventDefault();
          if($stateParams.type != 'profile' && $stateParams.type != 'department')
            /*
            Need to ideate on using $location.url() or $state.go()
             */
            $state.go('main');
            // console.log(Auth.getCurrentUser());
        }
      });
  });