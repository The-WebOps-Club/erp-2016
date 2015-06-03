'use strict';

describe('Controller: EventListCtrl', function () {

  // load the controller's module
  beforeEach(module('erp2015App'));

  var EventListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventListCtrl = $controller('EventListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
