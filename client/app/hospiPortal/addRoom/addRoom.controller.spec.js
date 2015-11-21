'use strict';

describe('Controller: AddRoomCtrl', function () {

  // load the controller's module
  beforeEach(module('erp2015App'));

  var AddRoomCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddRoomCtrl = $controller('AddRoomCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
