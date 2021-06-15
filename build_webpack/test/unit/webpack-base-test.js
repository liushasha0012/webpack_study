const webpackBaseConfig = require('../../lib/webpack.base.js');
const assert = require('assert');
const path = require('path');

describe('webpack.base.js test case', () => {
  it('entry', () => {
    assert.equal(
      webpackBaseConfig.entry.hello,
      path.join(__dirname, '../smoke/template/src/hello/index.js')
    );
    assert.equal(
      webpackBaseConfig.entry.vue_webpack,
      path.join(__dirname, '../smoke/template/src/vue_webpack/index.js')
    );
  });
});
