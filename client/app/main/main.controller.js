'use strict';

angular.module('erp2015App')
  .controller('MainCtrl', function ($scope, $state, $http, socket, $mdDialog) {

	$scope.showAdvanced = function(ev) {
		console.log('yo');
	    $mdDialog.show({
	      controller: DialogController,
	      templateUrl: 'app/main/dialog1.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true
	    })
	    .then(function(answer) {
	      $scope.status = 'You said the information was "' + answer + '".';
	    }, function() {
	      $scope.status = 'You cancelled the dialog.';
	    });
	  };
  });

  function DialogController($scope, $mdDialog) {
	    
	$scope.imageUploader = {
        myImage: '',
        myCroppedImage: ''
    };
   
   var imageid = '';
   var imagename = '';
   var uploadfile = '';
   console.log('hrello');
   var handleFileSelect = function(evt) {
     console.log('yo1');
	
     var myfile = evt.currentTarget.files[0];
     var reader = new FileReader();
     reader.onload = function (evt) {
       $scope.$apply(function ($scope) {
         $scope.imageUploader.myImage = evt.target.result;
       });
       uploadfile = myfile;
     };
     reader.readAsDataURL(myfile);
   };
   $scope.$watch('file', function () {
   	handleFileSelect();
   })
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}
