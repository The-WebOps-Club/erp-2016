'use strict';

describe('Controller: AllEventsCtrl', function () {

  // load the controller's module
  beforeEach(module('erp2015App'));

  var AllEventsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AllEventsCtrl = $controller('AllEventsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
