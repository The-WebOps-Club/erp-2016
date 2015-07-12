'use strict';

describe('Controller: NewsfeedCtrl', function () {

  // load the controller's module
  beforeEach(module('erp2015App'));

  var NewsfeedCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewsfeedCtrl = $controller('NewsfeedCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
