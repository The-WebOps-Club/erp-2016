'use strict';

angular.module('erp2015App')
  .controller('SponsorsCtrl',function ($scope,$resource) {
    var sponsors=$resource('/api/sponsors');
    $scope.all_sponsors = sponsors.query();
    $scope.img_uri = function(logo){
      if(!logo)
        return "";
      var idx=logo.indexOf('pics');
      var path='http://localhost/'+logo.slice(idx);
      return path;
    }
  });
