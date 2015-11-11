'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var placeCtrlStub = {
  index: 'placeCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var placeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './place.controller': placeCtrlStub
});

describe('Place API Router:', function() {

  it('should return an express router instance', function() {
    placeIndex.should.equal(routerStub);
  });

  describe('GET /api/places', function() {

    it('should route to place.controller.index', function() {
      routerStub.get
        .withArgs('/', 'placeCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
