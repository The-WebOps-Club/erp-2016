'use strict';

describe('Controller: EditProfileCtrl', function () {

  // load the controller's module
  beforeEach(module('erp2015App'));

  var EditProfileCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditProfileCtrl = $controller('EditProfileCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
