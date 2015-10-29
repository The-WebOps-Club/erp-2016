'use strict';

angular.module('erp2015App')
  .controller('tdpSubmitCtrl',function ($scope,$resource, TDPSubmitService, $state, $http, $upload) {
    console.log("Working....");

    var regID="";
    //Checking registration status
    TDPSubmitService.getRegObject(regID)
      .then(function (regobject) {
        var regstatus = regobject.isSelected;
        $scope.regStatus = true;

      });

    var handleFileSelect = function(evt) {
      // console.log(evt.currentTarget.files);
      var myfile = evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function ($scope) {
          $scope.myImage = evt.target.result;
        });
        uploadFileEventList = myfile;
        console.log(myfile);
      };
      reader.readAsDataURL(myfile);
    };
    angular.element(document.querySelector('#file')).on('change', handleFileSelect);
    $scope.save = function() {
                console.log($scope.file);
                if($scope.file) {
                    //if($scope.form.fileId) $http.delete('api/uploads/'+$scope.form.fileId+'/');
                    var file = $scope.file;
                    $upload.upload({
                        url: 'api/uploads/',
                        file: file
                    }).progress(function (evt) {
                        $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.file.name);
                    }).success(function (data, status, headers, config) {
                        console.log(data.fileId);
                        $http.put('/api/registrations' + regID, {
                            fileName: file.name,
                            fileId: data.fileId,
                        })
                        .then(function (message) {
                            $scope.form.saved = true;
                            window.alert(data.message);
                        });
                    });
                }
                else{
                    $http.put('/api/registrations' + regID , { 
                        formValues: null,
                        formId: null,
                    })
                    .then(function (message) {
                        $scope.form.saved = true;
                        
                        window.alert(message);
                    });
                }
            };

    $scope.validate = function() {
                    $http.post('/api/registrations', { 
                        eventRegistered: "56321d3f097564520fcb7e58" ,
                        team: "5630ea7d011ad43337baaedd" ,
                        registrationTime: Date.now() , 
                        isSelected: false,
                        fileId: null,
                        fileName: null
                    })
                    .then(function (message) {
                        $scope.regStatus = true;
                        
                        window.alert(message);
                    });
            };

    $scope.unregister = function() {
                    $http.delete('/api/registrations/56325c8c783419141fd67e84', { 
                        
                    })
                    .then(function (message) {
                        $scope.regStatus = true;
                        
                        window.alert(message);
                    });
            };
    // var sponsors=$resource('/api/sponsors');
    // $scope.all_sponsors = sponsors.query();
    // $scope.img_uri = function(logo){
    //   if(!logo)
    //     return "";
    //   var idx=logo.indexOf('pics');
    //   var path='http://localhost/'+logo.slice(idx);
    //   return path;
    //   }
  });
