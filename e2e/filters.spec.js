'use strict';

describe('filtering', function() {
  beforeEach(function() {
    browser.get('http://localhost:3000/');
  });

  describe('Region filter', function() {
    var regionFilterDropdown;

    beforeEach(function() {
      regionFilterDropdown = element.all(by.model('displayConfig.region'));
    });

    describe('Dropdown menu', function() {
      it('should exist', function() {
        expect(regionFilterDropdown.count()).toBe(1);
      });
    });
  });

  describe('Operating system filter', function() {
    var operatingSystemFilterDropdown;

    beforeEach(function() {
      operatingSystemFilterDropdown = element.all(by.model('displayConfig.os'));
    });

    describe('Dropdown menu', function() {
      it('should exist', function() {
        expect(operatingSystemFilterDropdown.count()).toBe(1);
      });
    });
  });
});
