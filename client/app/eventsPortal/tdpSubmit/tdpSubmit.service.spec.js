'use strict';

describe('Service: TDPSubmitService', function () {

  // load the service's module
  beforeEach(module('erp2015App'));

  // instantiate service
  var tdpsubmit;
  beforeEach(inject(function (_tdpsubmit_) {
    tdpsubmit = _tdpsubmit_;
  }));

  it('should do something', function () {
    expect(!!tdpsubmit).toBe(true);
  });

});