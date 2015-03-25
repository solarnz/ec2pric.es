'use strict';

describe('github banner', function() {
  var banner;

  beforeEach(function() {
    browser.get('/');

    banner = element(by.css(
      'a[href="https://github.com/solarnz/ec2pric.es"]'
    ));
  });

  it('should be present', function() {
    expect(banner.isPresent).toBeTruthy();
  });
});
