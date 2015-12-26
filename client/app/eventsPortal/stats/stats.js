'use strict';

angular.module('erp2015App')
  .factory('StatsExcel',function($window){
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
  .controller('StatsCtrl', function ($scope, EventsPortalService, $state, $http, $mdDialog, Auth, $stateParams, StatsExcel, $timeout, $mdToast) {

    $scope.TDPlength = [];
    $scope.events = [];
    $http.get('/api/events/forStats').
      then(function (response) {

        response.data.sort(function (a, b) {
          if(a.eventCategory[0].title>b.eventCategory[0].title) {
            return true;
          }
          return false;
        });

        $scope.events = response.data;

        var numEvents = $scope.events.length;
        for(var i=0; i<numEvents; i++) {
          var numReg = $scope.events[i].registrations.length;
          var numTempTDP = 0;

          for(var j=0; j<numReg; j++) {
            if($scope.events[i].registrations[j].submittedTDP) {
              numTempTDP += 1;
            }
          }
          $scope.TDPlength.push(numTempTDP);
        }
      });

    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
      $scope.exportHref = StatsExcel.tableToExcel(tableId, 'sheet name');
      $timeout(function() {
        var link = document.createElement('a');
        link.download = "Shaastra-Statistics-registrations.xlsx";
        link.href = $scope.exportHref;
        link.click();
      }, 100);
    };

});
