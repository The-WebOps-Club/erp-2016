'use strict';

describe('Service: postComment', function () {

  // load the service's module
  beforeEach(module('erp2015App'));

  // instantiate service
  var postComment;
  beforeEach(inject(function (_postComment_) {
    postComment = _postComment_;
  }));

  it('should do something', function () {
    expect(!!postComment).toBe(true);
  });

});
