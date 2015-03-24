'use strict';

describe('github banner', function() {
  beforeEach(function() {
    browser.get('http://localhost:3000/');
  });

  it('should load', function() {
    var list = element.all(by.css(
      'a[href="https://github.com/solarnz/ec2pric.es"]'
    ));

    expect(list.count()).toBe(1);
  });
});
