'use strict';

describe('Controller: DepartmentCtrl', function () {

  // load the controller's module
  beforeEach(module('erp2015App'));

  var DepartmentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DepartmentCtrl = $controller('DepartmentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
