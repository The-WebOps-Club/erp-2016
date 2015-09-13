'use strict';

describe('Controller: SaarangCtrl', function () {

  // load the controller's module
  beforeEach(module('erp2015App'));

  var SaarangCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SaarangCtrl = $controller('SaarangCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
