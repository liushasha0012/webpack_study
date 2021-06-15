const {merge} = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  devServer: {
    contentBase: 'dist/', // 需要热更新的文件夹
    hot: true, // 开启热更新
  },
  devtool: 'source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

module.exports = merge(devConfig, baseConfig);
