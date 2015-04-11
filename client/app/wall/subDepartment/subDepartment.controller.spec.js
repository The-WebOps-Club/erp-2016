'use strict';

describe('Controller: SubDepartmentCtrl', function () {

  // load the controller's module
  beforeEach(module('erp2015App'));

  var SubDepartmentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubDepartmentCtrl = $controller('SubDepartmentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
