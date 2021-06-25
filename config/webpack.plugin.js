const path = require('path');
const MyPlugin = require('../plugins/my-plugin.js');
module.exports = {
  entry: path.join(__dirname, '../src/plugin_test/index.js'),
  output: {
    filename: 'plugin.js',
    path: path.join(__dirname, '../dist'),
  },
  plugins: [new MyPlugin({
      name: '伊万诺夫斯基 利路修'
  })],
  mode: 'production'
};