'use strict';

angular.module('erp2015App')
  .controller('AddTeamCtrl', function ($scope,$http,$filter) {

   $scope.searchName = function (input) {
   	 $scope.names = $filter('filter')($scope.users,{name:input}); 
   	 $scope.inputName=input;
   }
   
   $scope.searchDept = function (input) {
     $scope.var1 = $scope.departments.concat($scope.subDepartments);
     $scope.var2 = $scope.var1.concat($scope.groups);
     $scope.depts = $filter('filter')($scope.var2,{name:input}); 
     $scope.inputDept=input;
   }

   $http.get('/api/users/').
   success(function(data, status, headers, config){
   	$scope.users = data;
   }).
   error(function(data, status, headers, config){
   	console.log("error");
   });

   //  $http.get('/api/subDepartments/').
   // success(function(data, status, headers, config){
   //  $scope.subDepartments = data;
   // }).
   // error(function(data, status, headers, config){
   //  console.log("error");
   // });

   //  $http.get('/api/groups/').
   // success(function(data, status, headers, config){
   //  $scope.groups = data;
   // }).
   // error(function(data, status, headers, config){
   //  console.log("error");
   // });
   
   // $http.get('/api/departments/').
   // success(function(data, status, headers, config){
   // 	$scope.departments = data;
   // }).
   // error(function(data, status, headers, config){
   // 	console.log("error");
   // }); 

  $scope.departments=[
  {
    "_id": "5592637b76c5a9c360ad6587",
    "wall": "5592637b76c5a9c360ad6588",
    "name": "Web and Mobile Operations",
    "__v": 9,
    "updatedOn": "2015-06-30T09:38:03.153Z",
    "createdOn": "2015-06-30T09:38:03.153Z",
    "qms": [],
    "coords": [
      {
        "_id": "5592ad036f069aa96d24931f",
        "wall": "5592ad036f069aa96d249320",
        "updatedOn": "2015-06-30T15:30:55.324Z",
        "createdOn": "2015-06-30T14:51:47.293Z",
        "provider": "local",
        "hashedPassword": "htYgpljRqttT7rqmqXCGE0uUscs2+3EKmr8Q72NReB+bjAgXg7OScK9Xp2x+OKFHG+PhwUej8M2+M6MPr+t7wQ==",
        "salt": "hJkCryx2QzPK35n3F/Nc8Q==",
        "__v": 2,
        "lastSeen": "2015-07-07T15:57:31.688Z",
        "deviceId": [],
        "groups": [
          "559265e56f069aa96d2492c8"
        ],
        "subDepartment": [],
        "department": [
          "5592637b76c5a9c360ad6587"
        ],
        "alternateNumber": "",
        "phoneNumber": "8220156276",
        "cgpa": 8.79,
        "summerLocation": "banglore",
        "city": "bangalore",
        "role": "user",
        "email": "harishreddy05@gmail.com",
        "roomNumber": "",
        "rollNumber": "ee14b027",
        "name": "K. Harish Reddy"
      },
      {
        "_id": "5596aa8fcd8f4a005fdac2c5",
        "wall": "5596aa8fcd8f4a005fdac2c6",
        "updatedOn": "2015-07-12T08:32:50.671Z",
        "createdOn": "2015-07-03T15:30:23.332Z",
        "provider": "local",
        "hashedPassword": "UUXQNbH8VSdk98MEVlqCghNoKsPBA9Z28BcEY6QG2Bre4rTbGQLM2Xec5LXtNUq6ia1xCJ3WZLwWfQDSnpAjBA==",
        "salt": "phICvd8RHvj5pNgqd5vwow==",
        "__v": 29,
        "lastSeen": "2015-07-12T08:45:12.419Z",
        "hostel": "Saraswathi",
        "profilePic": "55a20c058b42234e67aec237",
        "deviceId": [
          "cFv5zmSqg84:APA91bFY5EKhJdqOfV4w77wRb5ZzlHrLZwAfu5PsngBc2-yfkrY0SfAdrMDz8RPrrbi_ANtCTJnsgtgsqoD2qKAsho3B7bVwcQxfPvN1UChGqaedIxrFj4dWf3e1RuqVpPL9ge7HZHCC",
          "ckPzUWwE8ak:APA91bHJbCojtQLbHemIZc9dYfjpZyEsEB1smXoyOUSZdxfJhFYPqBi1y1IUJ-1oWrJb9N0R_T8nqepCHX3_pJEPwrnkvIfCWpPEMcvs9QB6s7XyF8ZVskdAtokW8BWeIFPa5gTBql0r",
          "cPYN8XP_U58:APA91bHsmMQ7F5TTdXbwmCxDZ5dMjPvZ4mdO56r2WQ3XMoRc6vjYS4VhJKISjclZZX8FTZXICa81qFGxzBbHPDzd98IBVvSeK0Dm5tbCGR9RyPy87rP7nIlHGr9QrceYpfh-I_IDwTdq",
          "org.saarang.erp",
          "fD55ksL5Xks:APA91bGGkzTUSaBzT9a3zRO2UQWYV4sWPwD-mAmpzK-CsVLjUsqAH9Ccomwm_85xrqOKKn-xXVkjhNQnDLxyIu5QX8Q-G8hYJYT0FdIrR-qQYKJ6IszH6IXQfv1B4UDoBPkCWabVMNX8",
          "cVrheMsiCOY:APA91bEZFyQ_3em9YmHa7EuEJRcu3a5pOWRbhCvRWfOtPkueFJnbQ0R6bJJN_PHW7T0DZXl0lkRDHRpFhBwB4QnExXsl7PFHyGs2jX8Ya02kG734wAUs685Kl5IxBPCxWNoHgMf-CWKi",
          "fib1RmAsavA:APA91bGjYEn50Mfg-5FIwySo_TQcJ38KeJf1cDEQ_kC-q_jgLFlDgM-WE-O6LmXU1-Zwk1eo0qgH3g2jAKMTDi3kfGjasE3ADCq4TOWjhif15QCmKx2UfT7_7ZNmctLWPj6lvAfahvoY"
        ],
        "groups": [
          "559265e56f069aa96d2492c8"
        ],
        "subDepartment": [
          "559263a176c5a9c360ad6589"
        ],
        "department": [
          "5592637b76c5a9c360ad6587"
        ],
        "alternateNumber": "9087463300",
        "phoneNumber": "9087463300",
        "cgpa": 8.8,
        "summerLocation": "Chennai",
        "city": "Chennai",
        "role": "user",
        "email": "kevinselvaprasanna@gmail.com",
        "roomNumber": "755",
        "rollNumber": "ee14b028",
        "name": "Kevin Selva Prasanna"
      },
      {
        "_id": "5596aaf6cd8f4a005fdac2c9",
        "wall": "5596aaf6cd8f4a005fdac2ca",
        "updatedOn": "2015-07-03T15:43:49.282Z",
        "createdOn": "2015-07-03T15:32:06.277Z",
        "provider": "local",
        "hashedPassword": "cdsk5KNmLEjFlYOumDJ3pMdH6SBXCwcLKDJITAR4ngu2hVG0T1HyM/5KANPkyGVO1+gY+iRPH3ozBBIl4/vf0w==",
        "salt": "9y8yqTka68vIkvOaitcQTw==",
        "__v": 3,
        "lastSeen": "2015-07-03T15:32:06.832Z",
        "deviceId": [],
        "groups": [
          "559265e56f069aa96d2492c8"
        ],
        "subDepartment": [
          "559263a176c5a9c360ad6589"
        ],
        "department": [
          "5592637b76c5a9c360ad6587"
        ],
        "alternateNumber": "",
        "phoneNumber": "9384928393",
        "cgpa": 9,
        "summerLocation": "adsf",
        "city": "ad",
        "role": "user",
        "email": "seetha@gmail.com",
        "roomNumber": "",
        "rollNumber": "ch23b322",
        "name": "seetha"
      },
      {
        "_id": "5596ab45cd8f4a005fdac2cb",
        "wall": "5596ab45cd8f4a005fdac2cc",
        "updatedOn": "2015-07-11T19:59:09.936Z",
        "createdOn": "2015-07-03T15:33:25.403Z",
        "provider": "local",
        "hashedPassword": "IZrYjNn4QVPxbrsCJv8Bh0XREUpWLZ2X5yIE+nX4YInJcqoHpdcPknjWoYIHuAy/InZN8SKgihnh3rz+q1xEhg==",
        "salt": "Jcunl93Lg7/6bsen1QUISA==",
        "__v": 17,
        "lastSeen": "2015-07-13T00:56:16.455Z",
        "hostel": "Tapti",
        "profilePic": "55a16fcc48bf40ce6e9bde8f",
        "deviceId": [
          "dZXo7cDHfio:APA91bFk5tnLytVc9ygf7eK_jlGrxanzMSj73TS-5EBpAlEpyuKiSXROabtrQJ5w1l1OGHuc5cQhm1PnrfnqQnMYxc19k38Zp2YlyuQYUOcgM24AD7e2hgC8wNjAfIGYTmU7sQClZRPB",
          "drW4KHPQ5LQ:APA91bFAsNiZcGM4O9vbVCo5WO5jyGRWaNMOvs0o46yGi6i9JaMnWa2v12V_yPgPNJgfk9PWYGqLuxHK1LG3XPSKXiKYYDaVt9CKTONJwSn_n9e1Ds3T1GrvJUYSoNFb5u7l5CgzyXCJ",
          "dNLDCeAAVi0:APA91bE9KJ4FdeVNUCt2TqBXwE4JJpdNBbWjkryJjmoRKn063cWxok-RfXG6LbGhQ8AiXH3mFCJV9vG0NTI6ohW0_C8nc0fyzi-znfLKpVXR5RCNrA3i7Y-kVHGOIMG6IFKL40s1NxSw"
        ],
        "groups": [
          "559265e56f069aa96d2492c8"
        ],
        "subDepartment": [
          "559263a176c5a9c360ad6589"
        ],
        "department": [
          "5592637b76c5a9c360ad6587"
        ],
        "alternateNumber": "1434567890",
        "phoneNumber": "1234567890",
        "cgpa": 7.81,
        "summerLocation": "chennai",
        "city": "Chennai",
        "role": "user",
        "email": "sasebot@gmail.com",
        "roomNumber": "243",
        "rollNumber": "Ae14b043",
        "name": "Ajmal"
      },
      {
        "_id": "5596b435832484de49b42efc",
        "wall": "5596b435832484de49b42efd",
        "updatedOn": "2015-07-12T17:45:23.940Z",
        "createdOn": "2015-07-03T16:11:33.794Z",
        "provider": "local",
        "hashedPassword": "RGt8Sjp5KN4i7HhTHAHUqgIXwVXcdoaldE5/knz4gcDK3ZIX5WayhdTuZFnlpTptw+9cJevZboiz5PTmEbRxrA==",
        "salt": "zOx7mPpEKBeAoYwqaVYi6Q==",
        "__v": 23,
        "lastSeen": "2015-07-12T18:50:07.906Z",
        "hostel": "Mahanadhi",
        "profilePic": "559be4969616cba53e9ffb7e",
        "deviceId": [
          "e1N3NBU5BFA:APA91bGoT-136Z045C8_U4UGSKvt4rA9gffrMu2exI2OLE9KjfY-Dlalazcd8Eb28C-LzWTJCuWu5ytzZp83URk699Jr6zju1YYgGMLoswBh2r1qK-wBnBn6M9ZRQTo16CqxODOeqIJP",
          "cQN9t1LBDFg:APA91bEV2XQXDVT1CYduFijkY8LCVdNaD8aH7sFiM7oRdyvd8Lwgtb7wmWm_9mvoz_Wnw4uN96nERwPv9h6BFmOir_kqQ6EY67K7NEmWZuZORXvKX-pdKsEqtyM16kPL_Snde-_zGFoq"
        ],
        "groups": [
          "559265e56f069aa96d2492c8"
        ],
        "subDepartment": [
          "559263a176c5a9c360ad6589"
        ],
        "department": [
          "5592637b76c5a9c360ad6587"
        ],
        "alternateNumber": "9176484419",
        "phoneNumber": "9176484419",
        "cgpa": 9.15,
        "summerLocation": "chennai",
        "city": "Jamshedpur",
        "role": "user",
        "email": "sri15496@gmail.com",
        "roomNumber": "546",
        "rollNumber": "ed14b038",
        "name": "seetharaman"
      }
    ],
    "superCoords": [],
    "cores": [
      {
        "_id": "55924da076c5a9c360ad6581",
        "wall": "55924da076c5a9c360ad6582",
        "updatedOn": "2015-07-13T05:53:41.663Z",
        "createdOn": "2015-06-30T08:04:48.885Z",
        "provider": "local",
        "hashedPassword": "kPjLWqzPgEB5X5b2UvvrFtQmkKYgTsFq+n3d0czD9oxzXkgLjbNyzD8KfXif60ua3c4qlSWePxVqYWx6WkNY7A==",
        "salt": "w3JmGzivfhnWA6SR9JpORg==",
        "__v": 231,
        "lastSeen": "2015-07-13T09:14:05.698Z",
        "profilePic": "55a0cdfe30afda3e5dac8e31",
        "hostel": "Alakananda",
        "deviceId": [
          "fl01IGta00I:APA91bG91-Zy2RtBJhl6xXPt52-qk4a5AvlhuyNVtpfW20RutGBdC_KFLlnfrzpJtzoZ44SE85_rambf3f5SsfZ7sXCiZHAZ9BHhVr1iz4QIyi02Gic8AtKCs4p0utuX0IanHbH1iPu2",
          "exI4fvK6nZk:APA91bFpOHNMI-u09u6yBjlozmhotdJy8OLDZQjSmUdJLrxMYsiJax1ilW3LG69XHMmmOUvi2zGfvSxFow-NmXS4tpI5EEiaHVxTfpNP1eRqSHtVXDg3gibCi-Op6lx-KfdAm-EjH4Ck",
          "enIOPB-JCTM:APA91bGQ3oFsQFFmVGLIDNrU0bVI_Zjz6yI9sDfT7q6BWdWe_8u5HhDfSi9rOsj7aRLOzTS0VVeDDq0DxLURzcejqeFcdsuoSgQgL5fIfpidGDgUli1hr0whZbMmoV7qThBpRNPOtyKp",
          "c-UL8a5FIgM:APA91bFxiqnDk0RqEhp6rEuO9EKU3qNaAWG8f1BMbAMnVTysdkgkqBVK9zTj7WrO2xOxJ0TXUU_8m56sSFfVi9cN-qcRmVxZQlZKM4BSisuPmTjvviB5HPcTOkR5iSLOnd9rQivxW0FZ",
          "c4vEQ_WDO24:APA91bHw_bjoT9-0YDnWA_86-aY-AGz4LOm4fSn-4e6G0xzTv7w6T5a3irXcwB9p72Q7HQheC9l8bUV9Fi3o_34stf4ZJ3NljcHRXEw7qu23WYmuatagtcgr8gJ1Cfnn37xi2s77bC0S",
          "eDUJHSO675E:APA91bEEillsiSwDcO-DKK4iqmGEVKYOekPgjAtWwQbnr-dOnpBlgzIsq7WKKBgAV6toAxqRV9LI6OyjWFC5IGR_gPsVXDXU66CGy5YqjMzyX0S_CMPqoj-8bPgaevJATJUlhCOUfKdu",
          "fgcaIEuWpQM:APA91bGNRExR2iYtJ7__XovwgqGeL0tRQmKJ2wnDHoUvGI6azIh278uBldM1vLppM6B9ywmZoruqSX_78IQ0QtAD_mKIJ7xHeKsAL_7WJ49ogkuqmlLJ8jebSs9CJDgukxZ5QUy-LVRK",
          "ej3uXfV4N0k:APA91bHU1GRhJf_kK_ZUDv4AxZ_la0hWksfuewpZ9defO_BEJumQ1cnK84W8uphdxvLjObztsBjemtsIxrlGNPrR0OFWLLCMm_Gc5v0wZXBS2TAFxg0ZAuWkAzkylSEnIGN-b96ZmNsf",
          "c97uTXaApUk:APA91bEWBe5rtGHMsmagK0ZiQxD8SeSCzskZR7q61AxR7VJjgZuejCrRIURZHTbu8dJnv64wGdAa9pyIiGKGHkbO9Lgj7Xwwu0A8VpNbUKQG0S88FZE67frOcHpZ0rhUCrH4Ok44IEmR",
          "c4hobGqsAI4:APA91bFvW9Ekn5K5ynzOlzF3JRzn_bHEXuU22GxlZENpScB5t0DYd37kAvyjAsMmtuwZYZCytIlDyu4l9EZ0WyPwlnGsNf2r1RXpvoAdf4XlniSJARzeYyqqySuNBA5mnsdbnwDFhilQ",
          "euJ3KGYmnEs:APA91bGownq7ActaWd4YRqQrN2_sCljvlN-o43ur3UNtk-SXDdfRBRZPbMN78i9tmPU9DzZRH96ITqSnNpdvztB4H36pljBaiOE2zkNeWt5Mx7W2B_IKb2cohQWzsM_uiyP0-jzFECoI",
          "cR0TVwA7r2s:APA91bEZnzAWu73LcTvLtE1Km1j-80tvLxnB_kj-wqcdAo56hv0eN_Hhpwl8uRdmBD6_sWOCBQ27z3CNoUFGSk8cCpG3KIaD_A5gG6qazV1QkBeAqjQoei_aHhg24mitn8VCam4PShwF",
          "dSmqJl1MSrU:APA91bFoizondW0UB7ZO2j-kb7iEaFMEMBDvERyGObdrBxLbDUUw3xGysU0qshHCLECzAg1RelhKS7NKp4M6FXcNmRZymHmim5A517a1gopI4dPm5BUsZHYItYlXSlZ2-dJ8ARfxxoJJ",
          "eyQargJKU7k:APA91bGAMsNsKZZzSPK9pvGb0eRTjtDbRFHzPMFwYBZhFHvagNQre8V0xTnvVMBwnG5gGkOsKSM5bHgj5RfzfT26drb283zFg3y_68pcEhimppZ_B3ruhVBGIXJG45dA3n-1Zt3UT_ra",
          "dfqA2D5B5jw:APA91bE-2SlgZTq-nlQsAmaIV33ZFDvFVaH899pPD219d29V27d6PJycdsvhbRGlJvsxIWQJ54Xwn7EeVNHV7TuMabLiOVGqQ6g183XsS3Stg2J6H7qvZDCPz8LB8TsEBjJiZYEcdZ-L",
          "dBbpomjQwWc:APA91bHjyue5M4AMPh5CbIev4-1A3aqV6TElBGW4FgnZ7Ec4ypbFStzm-9q2xrf_IZR_i3zbAXUw1LTTynvkPPboEJeh6sIuO98N8ZkpmkUJP_nHt9kfb8l4EeP5EGzo-p2Sv-FZruZ2",
          "euh-fy_bEGo:APA91bFADvgxRMJx-_cfzkNj_hqzmOYGjnFqv1XM5LJbUlrKQDAz4kkf5mZQz4aREaAZQNCjMTZ1oWe27BNGWMX3wYNNQpvDQd9LbTDrByoT7UzwJVJTpzNOwQtA1NPjueKFWrSMQmwK",
          "dfcg0SF_uqc:APA91bFZOrT4Xlo9DSuorhd7TYP6nZGCi_zwsYgvBqtXIg5C26lZgjTbHo_nsaYW-KYLorYKplDWU_G7ZiUjONzL3qK2K9Qss4PiAITZ6xRwBS-NTB6rFTSK8Oyjh_N4fDOBPFaE8_cD",
          "e1N3NBU5BFA:APA91bGoT-136Z045C8_U4UGSKvt4rA9gffrMu2exI2OLE9KjfY-Dlalazcd8Eb28C-LzWTJCuWu5ytzZp83URk699Jr6zju1YYgGMLoswBh2r1qK-wBnBn6M9ZRQTo16CqxODOeqIJP",
          "dCEUB4mcCcI:APA91bFVhWgNQJUDyoWpds3fWzqhFo3HvUQ35ofGfRZGIgI69QrMCqIfkykO2XGtFC1IfxWZrBfsKyb2-dIoGk7sgcMStkijaZuIffCiHDONxSNHAll-MmtMrv4_tqYXzFb7_69rRixy",
          "ebkNSzowgbw:APA91bEZofVXyIOFQw-8_u3tzDjy4Fk3LrPZCI_eP7f43k0ppljRWs--7O4_w0q_-sEyMprz4SRhHApcdefrydtWefNjKNjC0FkLvTKjGwHM7fFXxJTxZAyIB5YyuCT55OqQslYQqPSo",
          "fGaunxDwa_8:APA91bF0RJjIQ71cHU6IQNCEC0ycGUbnJs8Pn4YCMK5SHkkA3a9i5mCfrQ3_8vm7u0N9USp05xWHORPPukDi2mJucN0QOrXRBe6uMc0t3kX1OqoLEhW_gr3RES-jiAHIFTODeX-20iii",
          "cVrheMsiCOY:APA91bEZFyQ_3em9YmHa7EuEJRcu3a5pOWRbhCvRWfOtPkueFJnbQ0R6bJJN_PHW7T0DZXl0lkRDHRpFhBwB4QnExXsl7PFHyGs2jX8Ya02kG734wAUs685Kl5IxBPCxWNoHgMf-CWKi",
          "elfte7GotEk:APA91bGJ8byJ2bMOerw9X6iW4X4NNdRz_cBIgCGnBTLcdmf4C3-jXuycqWl71DbwfhEUe9NE3sxhXGBGSZzcPwFEMarcUKJLzZoXMJqDtPuw7RlDxIPB4HmRHMOz4fsyz2UgvNiLz-Kx",
          "eyX5HP1Zyag:APA91bGy5JI_W1NPhI_ogBK9yQP1KjjHVSQvp01W0DAg3jJ-PAN4pXenrlySrX1OiplokH1KH15h30Rpdp_iIcwzHSDP5ipxk-LvC5W6Thz88dEeNKTDNHU4i56CewmfD90GYsCevFc8",
          "f1tDs4kEt8k:APA91bGyEBJIrqERy-8JTW5MJic0AP4gLcZHF_ugLdwSvuEEf97opwYFoHtg_zvhaSojqEo2bDCSLEkhWcG2dGIqKW9P0vT6e6r5ZaLf8ejq0VaRbVb1-UXYprFhQaEyTm5jVTgv5InJ",
          "djYxQ82R_oM:APA91bFIA_z25-N9BnqqYE2wSeD4xBChdDheWCnf6Bx-I9Usyg8JmpZdtIfeX0DAJm13XIZJTZ4MKU74viswpioWHX9PIqVA4jsREBVVFPqcKgsUHP1nJ47V23Sk5WITMEkXpylO1efO",
          "cult9j-LTbs:APA91bF-NUZkn6ObnLaqeyv-vN4DdQ5le57ZR3UrGliwuTKFl84KSk3FTe8CrdAko_O3rMDGBReZZnvqGOTfNKIZsYCJVXaKPjPAa3rwGWmdB2KPpE9CPks6l4Xif-93kcBR5x3RWXpk",
          "cCnEyAOa2MQ:APA91bGCu_wuu2W6Tma-tJlJ-VpZCDe4LHIuQp_aZGreIq-d1gEkr80ON0w9SgbZuZ3YEWTu3JG3wy5v2VqA6L2t0_gzJ3W6M3MkSWhXn0UQxqsBNc8K9TpeGL1IPAsZFivfFG5Ed58C",
          "c7SrFCKO0Z8:APA91bHe7pNaihDcFIm6oT8oLMIttbuKWkrPiFk655Ffi6AyDVMTwSh-BsN6l1ilB34cP_qRhmYI9Sb7gLf-3igM-CLOqyMB580JkGrVfE3Wqow1ZWSBW8CzJCNSEklOMFfxnDBXjdht",
          "ftI2YABmPLE:APA91bGfMSlzGcJS-jl3-BPqX9tk5nyPpWeIuDArs2y5S62fiVIPZwZ9pgrwSkShYyxZoPwMNOSqzSFvQycIHUUQFvxJSd9Uwu53l4s0O5_dW8O-7pjDQ3y91oGiKRtNgqtOOGwrhQHc"
        ],
        "groups": [
          "559265e56f069aa96d2492c8"
        ],
        "subDepartment": [
          "559263a176c5a9c360ad6589"
        ],
        "department": [
          "5592637b76c5a9c360ad6587"
        ],
        "alternateNumber": "9483929192",
        "phoneNumber": "9837281839",
        "cgpa": 10,
        "summerLocation": "adf",
        "city": "Kone",
        "role": "admin",
        "email": "aqel123@gmail.com",
        "roomNumber": "107",
        "rollNumber": "ch13b006",
        "name": "Aqel Ahammed"
      }
    ],
    "subDepartments": [
      {
        "_id": "559263a176c5a9c360ad6589",
        "wall": "559263a176c5a9c360ad658a",
        "name": "Mobile Operations",
        "department": "5592637b76c5a9c360ad6587",
        "__v": 5,
        "updatedOn": "2015-06-30T09:38:41.174Z",
        "createdOn": "2015-06-30T09:38:41.174Z",
        "qms": [],
        "coords": [
          "5596ab45cd8f4a005fdac2cb",
          "5596aaf6cd8f4a005fdac2c9",
          "5596aa8fcd8f4a005fdac2c5",
          "5596b435832484de49b42efc"
        ],
        "superCoords": [],
        "cores": [
          "55924da076c5a9c360ad6581"
        ]
      },
      {
        "_id": "559263a976c5a9c360ad658b",
        "wall": "559263a976c5a9c360ad658c",
        "name": "Frontend",
        "department": "5592637b76c5a9c360ad6587",
        "__v": 0,
        "updatedOn": "2015-06-30T09:38:49.666Z",
        "createdOn": "2015-06-30T09:38:49.666Z",
        "qms": [],
        "coords": [],
        "superCoords": [],
        "cores": []
      },
      {
        "_id": "559263ae76c5a9c360ad658d",
        "wall": "559263ae76c5a9c360ad658e",
        "name": "Backend",
        "department": "5592637b76c5a9c360ad6587",
        "__v": 0,
        "updatedOn": "2015-06-30T09:38:54.805Z",
        "createdOn": "2015-06-30T09:38:54.805Z",
        "qms": [],
        "coords": [],
        "superCoords": [],
        "cores": []
      }
    ]
  }
]
  
  $scope.subDepartments=[
  {
    "_id": "559263a976c5a9c360ad658b",
    "wall": "559263a976c5a9c360ad658c",
    "name": "Frontend",
    "department": "5592637b76c5a9c360ad6587",
    "__v": 0,
    "updatedOn": "2015-06-30T09:38:49.666Z",
    "createdOn": "2015-06-30T09:38:49.666Z",
    "qms": [],
    "coords": [],
    "superCoords": [],
    "cores": []
  },
  {
    "_id": "559263ae76c5a9c360ad658d",
    "wall": "559263ae76c5a9c360ad658e",
    "name": "Backend",
    "department": "5592637b76c5a9c360ad6587",
    "__v": 0,
    "updatedOn": "2015-06-30T09:38:54.805Z",
    "createdOn": "2015-06-30T09:38:54.805Z",
    "qms": [],
    "coords": [],
    "superCoords": [],
    "cores": []
  },
  {
    "_id": "559263a176c5a9c360ad6589",
    "wall": "559263a176c5a9c360ad658a",
    "name": "Mobile Operations",
    "department": "5592637b76c5a9c360ad6587",
    "__v": 5,
    "updatedOn": "2015-06-30T09:38:41.174Z",
    "createdOn": "2015-06-30T09:38:41.174Z",
    "qms": [],
    "coords": [
      "5596ab45cd8f4a005fdac2cb",
      "5596aaf6cd8f4a005fdac2c9",
      "5596aa8fcd8f4a005fdac2c5",
      "5596b435832484de49b42efc"
    ],
    "superCoords": [],
    "cores": [
      "55924da076c5a9c360ad6581"
    ]
  }
]

  $scope.groups=[
  {
    "_id": "559265e56f069aa96d2492c8",
    "wall": "559265e56f069aa96d2492c9",
    "name": "Saarang 2016",
    "__v": 7,
    "updatedOn": "2015-06-30T09:48:21.349Z",
    "createdOn": "2015-06-30T09:48:21.349Z",
    "qms": [],
    "coords": [
      {
        "_id": "5592ad036f069aa96d24931f",
        "wall": "5592ad036f069aa96d249320",
        "updatedOn": "2015-06-30T15:30:55.324Z",
        "createdOn": "2015-06-30T14:51:47.293Z",
        "provider": "local",
        "hashedPassword": "htYgpljRqttT7rqmqXCGE0uUscs2+3EKmr8Q72NReB+bjAgXg7OScK9Xp2x+OKFHG+PhwUej8M2+M6MPr+t7wQ==",
        "salt": "hJkCryx2QzPK35n3F/Nc8Q==",
        "__v": 2,
        "lastSeen": "2015-07-07T15:57:31.688Z",
        "deviceId": [],
        "groups": [
          "559265e56f069aa96d2492c8"
        ],
        "subDepartment": [],
        "department": [
          "5592637b76c5a9c360ad6587"
        ],
        "alternateNumber": "",
        "phoneNumber": "8220156276",
        "cgpa": 8.79,
        "summerLocation": "banglore",
        "city": "bangalore",
        "role": "user",
        "email": "harishreddy05@gmail.com",
        "roomNumber": "",
        "rollNumber": "ee14b027",
        "name": "K. Harish Reddy"
      },
      {
        "_id": "5596aa8fcd8f4a005fdac2c5",
        "wall": "5596aa8fcd8f4a005fdac2c6",
        "updatedOn": "2015-07-12T08:32:50.671Z",
        "createdOn": "2015-07-03T15:30:23.332Z",
        "provider": "local",
        "hashedPassword": "UUXQNbH8VSdk98MEVlqCghNoKsPBA9Z28BcEY6QG2Bre4rTbGQLM2Xec5LXtNUq6ia1xCJ3WZLwWfQDSnpAjBA==",
        "salt": "phICvd8RHvj5pNgqd5vwow==",
        "__v": 29,
        "lastSeen": "2015-07-12T08:45:12.419Z",
        "hostel": "Saraswathi",
        "profilePic": "55a20c058b42234e67aec237",
        "deviceId": [
          "cFv5zmSqg84:APA91bFY5EKhJdqOfV4w77wRb5ZzlHrLZwAfu5PsngBc2-yfkrY0SfAdrMDz8RPrrbi_ANtCTJnsgtgsqoD2qKAsho3B7bVwcQxfPvN1UChGqaedIxrFj4dWf3e1RuqVpPL9ge7HZHCC",
          "ckPzUWwE8ak:APA91bHJbCojtQLbHemIZc9dYfjpZyEsEB1smXoyOUSZdxfJhFYPqBi1y1IUJ-1oWrJb9N0R_T8nqepCHX3_pJEPwrnkvIfCWpPEMcvs9QB6s7XyF8ZVskdAtokW8BWeIFPa5gTBql0r",
          "cPYN8XP_U58:APA91bHsmMQ7F5TTdXbwmCxDZ5dMjPvZ4mdO56r2WQ3XMoRc6vjYS4VhJKISjclZZX8FTZXICa81qFGxzBbHPDzd98IBVvSeK0Dm5tbCGR9RyPy87rP7nIlHGr9QrceYpfh-I_IDwTdq",
          "org.saarang.erp",
          "fD55ksL5Xks:APA91bGGkzTUSaBzT9a3zRO2UQWYV4sWPwD-mAmpzK-CsVLjUsqAH9Ccomwm_85xrqOKKn-xXVkjhNQnDLxyIu5QX8Q-G8hYJYT0FdIrR-qQYKJ6IszH6IXQfv1B4UDoBPkCWabVMNX8",
          "cVrheMsiCOY:APA91bEZFyQ_3em9YmHa7EuEJRcu3a5pOWRbhCvRWfOtPkueFJnbQ0R6bJJN_PHW7T0DZXl0lkRDHRpFhBwB4QnExXsl7PFHyGs2jX8Ya02kG734wAUs685Kl5IxBPCxWNoHgMf-CWKi",
          "fib1RmAsavA:APA91bGjYEn50Mfg-5FIwySo_TQcJ38KeJf1cDEQ_kC-q_jgLFlDgM-WE-O6LmXU1-Zwk1eo0qgH3g2jAKMTDi3kfGjasE3ADCq4TOWjhif15QCmKx2UfT7_7ZNmctLWPj6lvAfahvoY"
        ],
        "groups": [
          "559265e56f069aa96d2492c8"
        ],
        "subDepartment": [
          "559263a176c5a9c360ad6589"
        ],
        "department": [
          "5592637b76c5a9c360ad6587"
        ],
        "alternateNumber": "9087463300",
        "phoneNumber": "9087463300",
        "cgpa": 8.8,
        "summerLocation": "Chennai",
        "city": "Chennai",
        "role": "user",
        "email": "kevinselvaprasanna@gmail.com",
        "roomNumber": "755",
        "rollNumber": "ee14b028",
        "name": "Kevin Selva Prasanna"
      },
      {
        "_id": "5596aaf6cd8f4a005fdac2c9",
        "wall": "5596aaf6cd8f4a005fdac2ca",
        "updatedOn": "2015-07-03T15:43:49.282Z",
        "createdOn": "2015-07-03T15:32:06.277Z",
        "provider": "local",
        "hashedPassword": "cdsk5KNmLEjFlYOumDJ3pMdH6SBXCwcLKDJITAR4ngu2hVG0T1HyM/5KANPkyGVO1+gY+iRPH3ozBBIl4/vf0w==",
        "salt": "9y8yqTka68vIkvOaitcQTw==",
        "__v": 3,
        "lastSeen": "2015-07-03T15:32:06.832Z",
        "deviceId": [],
        "groups": [
          "559265e56f069aa96d2492c8"
        ],
        "subDepartment": [
          "559263a176c5a9c360ad6589"
        ],
        "department": [
          "5592637b76c5a9c360ad6587"
        ],
        "alternateNumber": "",
        "phoneNumber": "9384928393",
        "cgpa": 9,
        "summerLocation": "adsf",
        "city": "ad",
        "role": "user",
        "email": "seetha@gmail.com",
        "roomNumber": "",
        "rollNumber": "ch23b322",
        "name": "seetha"
      },
      {
        "_id": "5596ab45cd8f4a005fdac2cb",
        "wall": "5596ab45cd8f4a005fdac2cc",
        "updatedOn": "2015-07-11T19:59:09.936Z",
        "createdOn": "2015-07-03T15:33:25.403Z",
        "provider": "local",
        "hashedPassword": "IZrYjNn4QVPxbrsCJv8Bh0XREUpWLZ2X5yIE+nX4YInJcqoHpdcPknjWoYIHuAy/InZN8SKgihnh3rz+q1xEhg==",
        "salt": "Jcunl93Lg7/6bsen1QUISA==",
        "__v": 17,
        "lastSeen": "2015-07-13T00:56:16.455Z",
        "hostel": "Tapti",
        "profilePic": "55a16fcc48bf40ce6e9bde8f",
        "deviceId": [
          "dZXo7cDHfio:APA91bFk5tnLytVc9ygf7eK_jlGrxanzMSj73TS-5EBpAlEpyuKiSXROabtrQJ5w1l1OGHuc5cQhm1PnrfnqQnMYxc19k38Zp2YlyuQYUOcgM24AD7e2hgC8wNjAfIGYTmU7sQClZRPB",
          "drW4KHPQ5LQ:APA91bFAsNiZcGM4O9vbVCo5WO5jyGRWaNMOvs0o46yGi6i9JaMnWa2v12V_yPgPNJgfk9PWYGqLuxHK1LG3XPSKXiKYYDaVt9CKTONJwSn_n9e1Ds3T1GrvJUYSoNFb5u7l5CgzyXCJ",
          "dNLDCeAAVi0:APA91bE9KJ4FdeVNUCt2TqBXwE4JJpdNBbWjkryJjmoRKn063cWxok-RfXG6LbGhQ8AiXH3mFCJV9vG0NTI6ohW0_C8nc0fyzi-znfLKpVXR5RCNrA3i7Y-kVHGOIMG6IFKL40s1NxSw"
        ],
        "groups": [
          "559265e56f069aa96d2492c8"
        ],
        "subDepartment": [
          "559263a176c5a9c360ad6589"
        ],
        "department": [
          "5592637b76c5a9c360ad6587"
        ],
        "alternateNumber": "1434567890",
        "phoneNumber": "1234567890",
        "cgpa": 7.81,
        "summerLocation": "chennai",
        "city": "Chennai",
        "role": "user",
        "email": "sasebot@gmail.com",
        "roomNumber": "243",
        "rollNumber": "Ae14b043",
        "name": "Ajmal"
      },
      {
        "_id": "5596b435832484de49b42efc",
        "wall": "5596b435832484de49b42efd",
        "updatedOn": "2015-07-12T17:45:23.940Z",
        "createdOn": "2015-07-03T16:11:33.794Z",
        "provider": "local",
        "hashedPassword": "RGt8Sjp5KN4i7HhTHAHUqgIXwVXcdoaldE5/knz4gcDK3ZIX5WayhdTuZFnlpTptw+9cJevZboiz5PTmEbRxrA==",
        "salt": "zOx7mPpEKBeAoYwqaVYi6Q==",
        "__v": 23,
        "lastSeen": "2015-07-12T18:50:07.906Z",
        "hostel": "Mahanadhi",
        "profilePic": "559be4969616cba53e9ffb7e",
        "deviceId": [
          "e1N3NBU5BFA:APA91bGoT-136Z045C8_U4UGSKvt4rA9gffrMu2exI2OLE9KjfY-Dlalazcd8Eb28C-LzWTJCuWu5ytzZp83URk699Jr6zju1YYgGMLoswBh2r1qK-wBnBn6M9ZRQTo16CqxODOeqIJP",
          "cQN9t1LBDFg:APA91bEV2XQXDVT1CYduFijkY8LCVdNaD8aH7sFiM7oRdyvd8Lwgtb7wmWm_9mvoz_Wnw4uN96nERwPv9h6BFmOir_kqQ6EY67K7NEmWZuZORXvKX-pdKsEqtyM16kPL_Snde-_zGFoq"
        ],
        "groups": [
          "559265e56f069aa96d2492c8"
        ],
        "subDepartment": [
          "559263a176c5a9c360ad6589"
        ],
        "department": [
          "5592637b76c5a9c360ad6587"
        ],
        "alternateNumber": "9176484419",
        "phoneNumber": "9176484419",
        "cgpa": 9.15,
        "summerLocation": "chennai",
        "city": "Jamshedpur",
        "role": "user",
        "email": "sri15496@gmail.com",
        "roomNumber": "546",
        "rollNumber": "ed14b038",
        "name": "seetharaman"
      }
    ],
    "superCoords": [],
    "cores": [
      {
        "_id": "55924da076c5a9c360ad6581",
        "wall": "55924da076c5a9c360ad6582",
        "updatedOn": "2015-07-13T05:53:41.663Z",
        "createdOn": "2015-06-30T08:04:48.885Z",
        "provider": "local",
        "hashedPassword": "kPjLWqzPgEB5X5b2UvvrFtQmkKYgTsFq+n3d0czD9oxzXkgLjbNyzD8KfXif60ua3c4qlSWePxVqYWx6WkNY7A==",
        "salt": "w3JmGzivfhnWA6SR9JpORg==",
        "__v": 231,
        "lastSeen": "2015-07-13T09:14:05.698Z",
        "profilePic": "55a0cdfe30afda3e5dac8e31",
        "hostel": "Alakananda",
        "deviceId": [
          "fl01IGta00I:APA91bG91-Zy2RtBJhl6xXPt52-qk4a5AvlhuyNVtpfW20RutGBdC_KFLlnfrzpJtzoZ44SE85_rambf3f5SsfZ7sXCiZHAZ9BHhVr1iz4QIyi02Gic8AtKCs4p0utuX0IanHbH1iPu2",
          "exI4fvK6nZk:APA91bFpOHNMI-u09u6yBjlozmhotdJy8OLDZQjSmUdJLrxMYsiJax1ilW3LG69XHMmmOUvi2zGfvSxFow-NmXS4tpI5EEiaHVxTfpNP1eRqSHtVXDg3gibCi-Op6lx-KfdAm-EjH4Ck",
          "enIOPB-JCTM:APA91bGQ3oFsQFFmVGLIDNrU0bVI_Zjz6yI9sDfT7q6BWdWe_8u5HhDfSi9rOsj7aRLOzTS0VVeDDq0DxLURzcejqeFcdsuoSgQgL5fIfpidGDgUli1hr0whZbMmoV7qThBpRNPOtyKp",
          "c-UL8a5FIgM:APA91bFxiqnDk0RqEhp6rEuO9EKU3qNaAWG8f1BMbAMnVTysdkgkqBVK9zTj7WrO2xOxJ0TXUU_8m56sSFfVi9cN-qcRmVxZQlZKM4BSisuPmTjvviB5HPcTOkR5iSLOnd9rQivxW0FZ",
          "c4vEQ_WDO24:APA91bHw_bjoT9-0YDnWA_86-aY-AGz4LOm4fSn-4e6G0xzTv7w6T5a3irXcwB9p72Q7HQheC9l8bUV9Fi3o_34stf4ZJ3NljcHRXEw7qu23WYmuatagtcgr8gJ1Cfnn37xi2s77bC0S",
          "eDUJHSO675E:APA91bEEillsiSwDcO-DKK4iqmGEVKYOekPgjAtWwQbnr-dOnpBlgzIsq7WKKBgAV6toAxqRV9LI6OyjWFC5IGR_gPsVXDXU66CGy5YqjMzyX0S_CMPqoj-8bPgaevJATJUlhCOUfKdu",
          "fgcaIEuWpQM:APA91bGNRExR2iYtJ7__XovwgqGeL0tRQmKJ2wnDHoUvGI6azIh278uBldM1vLppM6B9ywmZoruqSX_78IQ0QtAD_mKIJ7xHeKsAL_7WJ49ogkuqmlLJ8jebSs9CJDgukxZ5QUy-LVRK",
          "ej3uXfV4N0k:APA91bHU1GRhJf_kK_ZUDv4AxZ_la0hWksfuewpZ9defO_BEJumQ1cnK84W8uphdxvLjObztsBjemtsIxrlGNPrR0OFWLLCMm_Gc5v0wZXBS2TAFxg0ZAuWkAzkylSEnIGN-b96ZmNsf",
          "c97uTXaApUk:APA91bEWBe5rtGHMsmagK0ZiQxD8SeSCzskZR7q61AxR7VJjgZuejCrRIURZHTbu8dJnv64wGdAa9pyIiGKGHkbO9Lgj7Xwwu0A8VpNbUKQG0S88FZE67frOcHpZ0rhUCrH4Ok44IEmR",
          "c4hobGqsAI4:APA91bFvW9Ekn5K5ynzOlzF3JRzn_bHEXuU22GxlZENpScB5t0DYd37kAvyjAsMmtuwZYZCytIlDyu4l9EZ0WyPwlnGsNf2r1RXpvoAdf4XlniSJARzeYyqqySuNBA5mnsdbnwDFhilQ",
          "euJ3KGYmnEs:APA91bGownq7ActaWd4YRqQrN2_sCljvlN-o43ur3UNtk-SXDdfRBRZPbMN78i9tmPU9DzZRH96ITqSnNpdvztB4H36pljBaiOE2zkNeWt5Mx7W2B_IKb2cohQWzsM_uiyP0-jzFECoI",
          "cR0TVwA7r2s:APA91bEZnzAWu73LcTvLtE1Km1j-80tvLxnB_kj-wqcdAo56hv0eN_Hhpwl8uRdmBD6_sWOCBQ27z3CNoUFGSk8cCpG3KIaD_A5gG6qazV1QkBeAqjQoei_aHhg24mitn8VCam4PShwF",
          "dSmqJl1MSrU:APA91bFoizondW0UB7ZO2j-kb7iEaFMEMBDvERyGObdrBxLbDUUw3xGysU0qshHCLECzAg1RelhKS7NKp4M6FXcNmRZymHmim5A517a1gopI4dPm5BUsZHYItYlXSlZ2-dJ8ARfxxoJJ",
          "eyQargJKU7k:APA91bGAMsNsKZZzSPK9pvGb0eRTjtDbRFHzPMFwYBZhFHvagNQre8V0xTnvVMBwnG5gGkOsKSM5bHgj5RfzfT26drb283zFg3y_68pcEhimppZ_B3ruhVBGIXJG45dA3n-1Zt3UT_ra",
          "dfqA2D5B5jw:APA91bE-2SlgZTq-nlQsAmaIV33ZFDvFVaH899pPD219d29V27d6PJycdsvhbRGlJvsxIWQJ54Xwn7EeVNHV7TuMabLiOVGqQ6g183XsS3Stg2J6H7qvZDCPz8LB8TsEBjJiZYEcdZ-L",
          "dBbpomjQwWc:APA91bHjyue5M4AMPh5CbIev4-1A3aqV6TElBGW4FgnZ7Ec4ypbFStzm-9q2xrf_IZR_i3zbAXUw1LTTynvkPPboEJeh6sIuO98N8ZkpmkUJP_nHt9kfb8l4EeP5EGzo-p2Sv-FZruZ2",
          "euh-fy_bEGo:APA91bFADvgxRMJx-_cfzkNj_hqzmOYGjnFqv1XM5LJbUlrKQDAz4kkf5mZQz4aREaAZQNCjMTZ1oWe27BNGWMX3wYNNQpvDQd9LbTDrByoT7UzwJVJTpzNOwQtA1NPjueKFWrSMQmwK",
          "dfcg0SF_uqc:APA91bFZOrT4Xlo9DSuorhd7TYP6nZGCi_zwsYgvBqtXIg5C26lZgjTbHo_nsaYW-KYLorYKplDWU_G7ZiUjONzL3qK2K9Qss4PiAITZ6xRwBS-NTB6rFTSK8Oyjh_N4fDOBPFaE8_cD",
          "e1N3NBU5BFA:APA91bGoT-136Z045C8_U4UGSKvt4rA9gffrMu2exI2OLE9KjfY-Dlalazcd8Eb28C-LzWTJCuWu5ytzZp83URk699Jr6zju1YYgGMLoswBh2r1qK-wBnBn6M9ZRQTo16CqxODOeqIJP",
          "dCEUB4mcCcI:APA91bFVhWgNQJUDyoWpds3fWzqhFo3HvUQ35ofGfRZGIgI69QrMCqIfkykO2XGtFC1IfxWZrBfsKyb2-dIoGk7sgcMStkijaZuIffCiHDONxSNHAll-MmtMrv4_tqYXzFb7_69rRixy",
          "ebkNSzowgbw:APA91bEZofVXyIOFQw-8_u3tzDjy4Fk3LrPZCI_eP7f43k0ppljRWs--7O4_w0q_-sEyMprz4SRhHApcdefrydtWefNjKNjC0FkLvTKjGwHM7fFXxJTxZAyIB5YyuCT55OqQslYQqPSo",
          "fGaunxDwa_8:APA91bF0RJjIQ71cHU6IQNCEC0ycGUbnJs8Pn4YCMK5SHkkA3a9i5mCfrQ3_8vm7u0N9USp05xWHORPPukDi2mJucN0QOrXRBe6uMc0t3kX1OqoLEhW_gr3RES-jiAHIFTODeX-20iii",
          "cVrheMsiCOY:APA91bEZFyQ_3em9YmHa7EuEJRcu3a5pOWRbhCvRWfOtPkueFJnbQ0R6bJJN_PHW7T0DZXl0lkRDHRpFhBwB4QnExXsl7PFHyGs2jX8Ya02kG734wAUs685Kl5IxBPCxWNoHgMf-CWKi",
          "elfte7GotEk:APA91bGJ8byJ2bMOerw9X6iW4X4NNdRz_cBIgCGnBTLcdmf4C3-jXuycqWl71DbwfhEUe9NE3sxhXGBGSZzcPwFEMarcUKJLzZoXMJqDtPuw7RlDxIPB4HmRHMOz4fsyz2UgvNiLz-Kx",
          "eyX5HP1Zyag:APA91bGy5JI_W1NPhI_ogBK9yQP1KjjHVSQvp01W0DAg3jJ-PAN4pXenrlySrX1OiplokH1KH15h30Rpdp_iIcwzHSDP5ipxk-LvC5W6Thz88dEeNKTDNHU4i56CewmfD90GYsCevFc8",
          "f1tDs4kEt8k:APA91bGyEBJIrqERy-8JTW5MJic0AP4gLcZHF_ugLdwSvuEEf97opwYFoHtg_zvhaSojqEo2bDCSLEkhWcG2dGIqKW9P0vT6e6r5ZaLf8ejq0VaRbVb1-UXYprFhQaEyTm5jVTgv5InJ",
          "djYxQ82R_oM:APA91bFIA_z25-N9BnqqYE2wSeD4xBChdDheWCnf6Bx-I9Usyg8JmpZdtIfeX0DAJm13XIZJTZ4MKU74viswpioWHX9PIqVA4jsREBVVFPqcKgsUHP1nJ47V23Sk5WITMEkXpylO1efO",
          "cult9j-LTbs:APA91bF-NUZkn6ObnLaqeyv-vN4DdQ5le57ZR3UrGliwuTKFl84KSk3FTe8CrdAko_O3rMDGBReZZnvqGOTfNKIZsYCJVXaKPjPAa3rwGWmdB2KPpE9CPks6l4Xif-93kcBR5x3RWXpk",
          "cCnEyAOa2MQ:APA91bGCu_wuu2W6Tma-tJlJ-VpZCDe4LHIuQp_aZGreIq-d1gEkr80ON0w9SgbZuZ3YEWTu3JG3wy5v2VqA6L2t0_gzJ3W6M3MkSWhXn0UQxqsBNc8K9TpeGL1IPAsZFivfFG5Ed58C",
          "c7SrFCKO0Z8:APA91bHe7pNaihDcFIm6oT8oLMIttbuKWkrPiFk655Ffi6AyDVMTwSh-BsN6l1ilB34cP_qRhmYI9Sb7gLf-3igM-CLOqyMB580JkGrVfE3Wqow1ZWSBW8CzJCNSEklOMFfxnDBXjdht",
          "ftI2YABmPLE:APA91bGfMSlzGcJS-jl3-BPqX9tk5nyPpWeIuDArs2y5S62fiVIPZwZ9pgrwSkShYyxZoPwMNOSqzSFvQycIHUUQFvxJSd9Uwu53l4s0O5_dW8O-7pjDQ3y91oGiKRtNgqtOOGwrhQHc"
        ],
        "groups": [
          "559265e56f069aa96d2492c8"
        ],
        "subDepartment": [
          "559263a176c5a9c360ad6589"
        ],
        "department": [
          "5592637b76c5a9c360ad6587"
        ],
        "alternateNumber": "9483929192",
        "phoneNumber": "9837281839",
        "cgpa": 10,
        "summerLocation": "adf",
        "city": "Kone",
        "role": "admin",
        "email": "aqel123@gmail.com",
        "roomNumber": "107",
        "rollNumber": "ch13b006",
        "name": "Aqel Ahammed"
      },
      {
        "_id": "55924eb776c5a9c360ad6583",
        "wall": "55924eb776c5a9c360ad6584",
        "updatedOn": "2015-07-03T17:10:50.598Z",
        "createdOn": "2015-06-30T08:09:27.684Z",
        "provider": "local",
        "hashedPassword": "3W6/PN9DZlHCHlmymU1O0axOxFVC0xtwvznorafl3KmTvn49IBcH7GB2fov1Ymyz8cwtsUJfAQQmHxhnSD1yMQ==",
        "salt": "QnxmuLQfRzQEECPu4f8woQ==",
        "__v": 8,
        "lastSeen": "2015-07-13T18:55:34.112Z",
        "profilePic": "5596c18f832484de49b42f34",
        "hostel": "Alakananda",
        "deviceId": [
          "cR0TVwA7r2s:APA91bEZnzAWu73LcTvLtE1Km1j-80tvLxnB_kj-wqcdAo56hv0eN_Hhpwl8uRdmBD6_sWOCBQ27z3CNoUFGSk8cCpG3KIaD_A5gG6qazV1QkBeAqjQoei_aHhg24mitn8VCam4PShwF",
          "dZXo7cDHfio:APA91bFk5tnLytVc9ygf7eK_jlGrxanzMSj73TS-5EBpAlEpyuKiSXROabtrQJ5w1l1OGHuc5cQhm1PnrfnqQnMYxc19k38Zp2YlyuQYUOcgM24AD7e2hgC8wNjAfIGYTmU7sQClZRPB"
        ],
        "groups": [
          "559265e56f069aa96d2492c8"
        ],
        "subDepartment": [],
        "department": [],
        "alternateNumber": "9176232323",
        "phoneNumber": "9789107938",
        "cgpa": 10,
        "summerLocation": "Secunderabad",
        "city": "Secunderabad",
        "role": "admin",
        "email": "deepakpadamata@gmail.com",
        "roomNumber": "607",
        "rollNumber": "EE13B073",
        "name": "Deepak Padamata"
      }
    ]
  }
]

  

    $scope.validate=function(form){
   	$scope.submitted="true";
    };
    
  });
