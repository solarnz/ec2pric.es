'use strict';

describe('ec2pric.es', function() {
  beforeEach(function() {
    browser.get('/');
  });

  describe('the browser title', function() {
    it('should be set correctly', function() {
      expect(browser.getTitle()).toEqual('ec2pric.es');
    });
  });
});
