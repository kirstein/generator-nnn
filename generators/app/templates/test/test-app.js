'use strict';

var assert = require('assert');

jest.dontMock('../<%= main %>');

var <%= camelName  %> = require('../<%= main %>');

describe('<%= camelName %>', function() {
  it('should work', function() {
    assert.strictEqual(<%= camelName %>(), 'awesome');
  });
});
