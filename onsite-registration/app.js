angular.module('OnsiteRegistrationApp', [])
       .controller('MainCtrl',['$http', '$scope', function($http, $scope){

        $scope.found = false
        $scope.error_msg = null
        $scope.same = true
        $scope.toggle = function(){
            if($scope.existing) $scope.existing = false
            else $scope.existing = true
        }

        $scope.getUserByFestID = function (){
            if($scope.festID.trim()==null)
                return

            $http({
                method:'POST',
                url:'http://localhost:8001/api/users/festid',
                data: {
                    'festID':$scope.festID
                }
            })
            .then(function(res){
                console.log(res)
                $scope.profile = res.data
                $scope.barcodeID = res.data.barcodeID
                $scope.found = true
            },

            function(err){
                console.log(err)
                $scope.profile = null
                $scope.barcodeID = null
                $scope.found = false
                $scope.error_msg = "Can't find user with given Shaastra ID"
            })
        }

        $scope.updateUserBarcode = function(){
            if($scope.barcodeID.trim()==null)
                return

            $http({
                method:'POST',
                url:'http://localhost:8001/api/users/barcode',
                data: {
                    'festID':$scope.profile.festID,
                    'barcodeID':$scope.barcodeID
                }
            })
            .then(function(res){
                // console.log(res.data.barcodeID)
                alert("Success")
            },
            function(err){
                alert(err)
            })
        }

        $scope.newUser = function (){
            if($scope.confirm_password != $scope.user.password){
                $scope.same=false
                return
            }
            else
                $scope.same=true
            console.log($scope.user)
            $http({
                method:'POST',
                url: 'http://localhost:8001/api/users',
                data: $scope.user
            })
            .then(function(res){
                alert("Success")
            },
            function(err){
                alert(err)
            })

        }

       }]);
