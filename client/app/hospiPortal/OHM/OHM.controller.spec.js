'use strict';

describe('Controller: OHMCtrl', function () {

  // load the controller's module
  beforeEach(module('erp2015App'));

  var OHMCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OHMCtrl = $controller('OHMCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
