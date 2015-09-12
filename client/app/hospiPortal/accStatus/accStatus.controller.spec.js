'use strict';

describe('Controller: AccStatusCtrl', function () {

  // load the controller's module
  beforeEach(module('erp2015App'));

  var AccStatusCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AccStatusCtrl = $controller('AccStatusCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
