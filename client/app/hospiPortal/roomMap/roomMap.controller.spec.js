'use strict';

describe('Controller: RoomMapCtrl', function () {

  // load the controller's module
  beforeEach(module('erp2015App'));

  var RoomMapCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RoomMapCtrl = $controller('RoomMapCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
