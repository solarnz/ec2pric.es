'use strict';

describe('filtering', function() {
  var INSTANCE_COUNT = 42;

  function getInstanceList() {
    return element.all(by.repeater('instance in instances'));
  }

  beforeEach(function() {
    browser.get('/');
  });

  describe('Region filter', function() {
    var dropdown;

    beforeEach(function() {
      dropdown = element(by.model('displayConfig.region'));
    });

    describe('Dropdown menu', function() {
      it('should exist', function() {
        expect(dropdown.isPresent()).toBeTruthy();
      });

      it('should have a default value of us-east-1', function() {
        var selectedOption = dropdown.$('option:checked');
        expect(selectedOption.getText()).toBe('us-east-1 (N. Virginia)');
      });
    });

    it('should not filter by default', function() {
      expect(getInstanceList().count()).toBe(INSTANCE_COUNT);
    });

    describe('when changing the region (to sa-east-1)', function() {
      beforeEach(function() {
        dropdown.$('option[value="8"]').click();
      });

      it('should have less instance types than the default', function() {
        expect(getInstanceList().count()).toBeLessThan(INSTANCE_COUNT);
      });

      it('should filter out instances not in the selected region', function() {
        getInstanceList().each(function(element) {
          var instanceName = element.$('[data-e2e-target="instanceName"]')
          .getText();
          instanceName.then(function(text) {
            expect(text).not.toEqual('c4.large');
          });
        });
      });
    });
  });

  describe('Operating system filter', function() {
    var dropdown;

    beforeEach(function() {
      dropdown = element(by.model('displayConfig.os'));
    });

    describe('Dropdown menu', function() {
      it('should exist', function() {
        expect(dropdown.isPresent()).toBeTruthy();
      });

      it('should not filter by default', function() {
        expect(getInstanceList().count()).toBe(INSTANCE_COUNT);
      });
    });

    describe('when changing the os (to Windows SQL)', function() {
      beforeEach(function() {
        dropdown.$('option[value="2"]').click();
      });

      it('should have less instance types than the default', function() {
        expect(getInstanceList().count()).toBeLessThan(INSTANCE_COUNT);
      });

      it('should filter out instances not in the selected region', function() {
        getInstanceList().each(function(element) {
          var instanceName = element.$('[data-e2e-target="instanceName"]')
          .getText();
          instanceName.then(function(text) {
            expect(text).not.toEqual('c1.medium');
          });
        });
      });
    });
  });
});
