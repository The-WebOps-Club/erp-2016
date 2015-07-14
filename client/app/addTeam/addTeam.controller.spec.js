'use strict';

describe('Controller: AddTeamCtrl', function () {

  // load the controller's module
  beforeEach(module('erp2015App'));

  var AddTeamCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddTeamCtrl = $controller('AddTeamCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
