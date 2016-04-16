'use strict';

describe('Directive: fileModel', function () {

  // load the directive's module and view
  beforeEach(module('erp2015App'));
  beforeEach(module('app/fileModel/fileModel.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<file-model></file-model>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the fileModel directive');
  }));
});