'use strict';

describe('Controller: DepartmentsCtrl', function () {

  // load the controller's module
  beforeEach(module('erp2015App'));

  var DepartmentsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DepartmentsCtrl = $controller('DepartmentsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
