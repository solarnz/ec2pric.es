'use strict';

let $compile, $rootScope;
let element, scope;

describe('Directive checkbox', () => {
  beforeEach(module('ec2pricesApp'));
  beforeEach(module('ec2pricesApp-templates'));

  beforeEach(inject((_$compile_, _$rootScope_) => {
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    scope = $rootScope.$new();
    element = $compile('<checkbox checked=\'checked\' />')(scope);
    $rootScope.$apply();
  }));

  it('should contain a cross when the variable is not defined', () => {
    expect(element.text()).toContain('\u2718');
  });

  it('should contain a corss when the variable is falsy', () => {
    scope.checked = true;
    $rootScope.$apply();

    expect(element.text()).toContain('\u2714');
  });

  it('should contain a tick when the variable is truthy', () => {
    scope.checked = true;
    $rootScope.$apply();

    expect(element.text()).toContain('\u2714');
  });
});
