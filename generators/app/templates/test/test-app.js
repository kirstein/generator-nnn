'use strict';

var assert = require('assert');
var <%= camelName  %> = require('../<%= main %>');

jest.dontMock('../<%= main %>');

describe('<%= camelName %>', function() {
  it('should work', function() {
    assert.strictEqual(<%= camelName %>(), 'awesome');
  });
});
