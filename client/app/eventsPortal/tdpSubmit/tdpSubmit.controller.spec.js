'use strict';

describe('Controller: tdpSubmitCtrl', function () {

  // load the controller's module
  beforeEach(module('erp2015App'));

  var tdpSubmitCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    tdpSubmitCtrl = $controller('tdpSubmitCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
