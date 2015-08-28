'use strict';

var assert = require('assert');

jest.dontMock('../<%= main %>');

describe('<%= camelName %>', function() {
  var <%= camelName  %> = require('../<%= main %>');

  it('should work', function() {
    assert.strictEqual(<%= camelName %>(), 'awesome');
  });
});
