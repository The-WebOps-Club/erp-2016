'use strict';

angular.module('erp2015App')
  .factory('SisExcel',function($window){
    var uri='data:application/vnd.ms-excel;base64,',
      template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
      format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
    return {
      tableToExcel:function(tableId,worksheetName) {
        var table=$(tableId),
        ctx={worksheet:worksheetName,table:table.html()},
        href=uri+base64(format(template,ctx));
        return href;
      }
    };
  })
  .controller('SisRegistrationsCtrl', function ($scope, EventsPortalService, $state, $http, $mdDialog, Auth, $stateParams, SisExcel, $timeout, $mdToast) {
    $scope.numberOfRegistrations = 0;

    $scope.users = [];
    $scope.eventsRegisteredByUser = [];
    $http.get('/api/users/sisFellows')
      .then(function (response) {
        $scope.users = response.data;
        $scope.numberOfRegistrations = response.data.length;

        for(var i=0; i<$scope.numberOfRegistrations; i++) {
          var numTeams = $scope.users[i].teams.length;
          var tempEvents = [];

          for(var j=0; j<numTeams; j++) {
            var numEvents = $scope.users[i].teams[j].eventsRegistered.length;

            for(var k=0; k<numEvents; k++) {
              tempEvents.push($scope.users[i].teams[j].eventsRegistered[k]);
            }
          }
          $scope.eventsRegisteredByUser.push(tempEvents);
        }
      });

    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
      $scope.exportHref = SisExcel.tableToExcel(tableId, 'sheet name');
      $timeout(function() {
        var link = document.createElement('a');
        link.download = "Shaastra-Fellowship-Programme-registrations.xlsx";
        link.href = $scope.exportHref;
        link.click();
      }, 100);
    };

});
