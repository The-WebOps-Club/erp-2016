'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile/:userId',
        templateUrl: 'app/wall/profile/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
          user: ['$http','$stateParams', function($http, $stateParams) {
             return $http.get('/api/users/' + $stateParams.userId)
                    .then(function(data) { return data; });
          }]
        },
        authenticate: true,
        data: {
          permissions: {
              except: ['anonymous'],
              redirectTo: 'login'
          }
        }
      })
      .state('department', {
        url: '/department/:deptId',
        templateUrl: 'app/wall/department/department.html',
        controller: 'DepartmentCtrl',
        authenticate: true,
        data: {
          permissions: {
              except: ['anonymous'],
              redirectTo: 'login'
          }
        }
      })
      .state('subDepartment', {
        url: '/subDepartment/:subDeptId',
        templateUrl: 'app/wall/subDepartment/subDepartment.html',
        controller: 'SubDepartmentCtrl',
        authenticate: true,
        data: {
          permissions: {
              except: ['anonymous'],
              redirectTo: 'login'
          }
        }
      });
  });
