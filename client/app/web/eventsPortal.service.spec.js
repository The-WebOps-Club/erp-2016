'use strict';

describe('Service: EventsPortalService', function () {

  // load the service's module
  beforeEach(module('erp2015App'));

  // instantiate service
  var eventsPortal;
  beforeEach(inject(function (_eventsPortal_) {
    eventsPortal = _eventsPortal_;
  }));

  it('should do something', function () {
    expect(!!eventsPortal).toBe(true);
  });

});
