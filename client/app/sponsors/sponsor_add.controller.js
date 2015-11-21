'use strict';

angular.module('erp2015App')
  .controller('SponsorAddCtrl',function (Upload,$scope,$http) {
    $scope.file=null
    $scope.priority=10
    $scope.row_layout=1
    $scope.submitted=false;
    $scope.submit = function(){
      $scope.submitted = true;
      if($scope.file && $scope.form.file.$valid && !$scope.file.$error){
        $scope.upload($scope.file,function(err,data){
          console.log(data)
          if(err || !data.fileId){
            console.log(err)
            return;
          }
          var body={
            title:$scope.title,
            sponsor_link:$scope.sponsor_link,
            logo:data.fileId,
            priority:$scope.priority||10,
            row_layout:$scope.row_layout||1,
            active:$scope.active||true
          }
          $http.post('/api/sponsors',body).
            then(function(response){
              console.log(response.data)
              //redirect to view spons
            })
          console.log(data)
        })
      } else {
        console.log("error")
        if($scope.form && $scope.form.file){
          console.log($scope.form.file.$error)
          console.log($scope.form.file.$valid)
        }
        if($scope.file)
          console.log($scope.file.$error)
      }
    }
    $scope.upload = function(file,cb){
        Upload.upload({
          url:'/api/uploads/sponsImages/',
          file:$scope.file,
        }).success(function(data){
          cb(null,data)
        }).error(function(err){
          cb(err,null)
        })
    }
  });
