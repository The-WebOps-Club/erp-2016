'use strict';

describe('Controller: TdpselectCtrl', function () {

  // load the controller's module
  beforeEach(module('erp2015App'));

  var TdpselectCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TdpselectCtrl = $controller('TdpselectCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
