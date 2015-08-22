'use strict';

describe('Controller: MomCtrl', function () {

  // load the controller's module
  beforeEach(module('erp2015App'));

  var MomCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MomCtrl = $controller('MomCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
