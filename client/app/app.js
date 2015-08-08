'use strict';

angular.module('erp2015App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ngFileUpload',
  'ui.bootstrap',
  'smart-table',
  'permission',
  'ngFacebook',
  'ngMaterial',
  'ngMessages',
  'infinite-scroll',
  'ngMdIcons'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })
  .config( function( $facebookProvider ) {
    $facebookProvider.setAppId('1597426613877122');
  })
  .run( function ($rootScope) {
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=1597426613877122";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth, Permission) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.url('/login');
        }
      });
    });
  })
  .run(function ($rootScope, Auth, Permission, User, $q) {
      Permission
        // Define user role calling back-end
        .defineRole('user', function (stateParams) {
          var deferred = $q.defer();
          Auth.isLoggedInAsync(function (success) {
            var currUser = Auth.getCurrentUser();
            if(currUser.role === 'user') {
              deferred.resolve();
            }
            else {
              deferred.reject();
            }
          });

          return deferred.promise;     
      })
       .defineRole('anonymous', function (stateParams) {
         var deferred = $q.defer();
         var currUser = Auth.getCurrentUser();
            if(currUser) 
            {
              deferred.reject();
            }
            else
            {
              deferred.resolve(); 
            }
           return deferred.promise;
         })
       .defineRole('admin', function(stateParams) {
         var deferred = $q.defer();
          Auth.isLoggedInAsync(function (success) {
            var currUser = Auth.getCurrentUser();
            if(currUser.role === 'admin') {
              deferred.resolve();
            }
            else {
              deferred.reject();
            }
          });

          return deferred.promise;
       })
       .defineRole('core', function(stateParams) {
         var deferred = $q.defer();
          Auth.isLoggedInAsync(function (success) {
            var currUser = Auth.getCurrentUser();
            if(currUser.role === 'core') {
              deferred.resolve();
            }
            else {
              deferred.reject();
            }
          });

          return deferred.promise;        
       });
     })
        // A different example for admin
        // .defineRole('admin', function (stateParams) {
        //   var deferred = $q.defer();

        //   User.getAccessLevel().then(function (data) {
        //     if (data.accessLevel === 'admin') {
        //       deferred.resolve();
        //     } else {
        //       deferred.reject();
        //     }
        //   }, function () {
        //     // Error with request
        //     deferred.reject();
        //   });

        //   return deferred.promise;
        // });
    //});
    /**
     * Defining all roles
     */
    // Permission
    //   .defineRole('anonymous', function(stateParams) {
    //     Auth.isLoggedInAsync(function(success) {
    //       var currUser = Auth.getCurrentUser();
    //       if(currUser) {
    //         return true;
    //       }
    //       return false;
    //     });
    //   })
      // .defineRole('user', function(stateParams) {
      //   Auth.isLoggedInAsync(function (success) {
      //     var currUser = $rootScope.currentUser;
      //     if(currUser.role === 'user') {
      //       return true;
      //     }
      //   });
      //   return false;        
      // });
      // .defineRole('core', function(stateParams) {
      //   Auth.isLoggedInAsync(function (success) {
      //     var currUser = Auth.getCurrentUser();
      //     if(currUser.role === 'core') {
      //       return true;
      //     }
      //   });
      //   return false;        
      // })
  //    .defineRole('admin', function(stateParams) {
  //       return Auth.isAdmin();       
  //     })
  // });