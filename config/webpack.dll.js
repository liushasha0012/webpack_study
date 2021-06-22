const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    library: ['vue'],
  },
  output: {
    filename: '[name]_[chunkhash].dll.js',
    path: path.join(__dirname, '../build/library'),
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(__dirname, '../build/library/[name].json'),
    }),
  ],
};