'use strict';

describe('Controller: TdpCreationCtrl', function () {

  // load the controller's module
  beforeEach(module('erp2015App'));

  var TdpCreationCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TdpCreationCtrl = $controller('TdpCreationCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
