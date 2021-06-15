const {merge} = require('webpack-merge');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production', // 默认开启 tree-shaking和scope hoisting
  plugins: [
    new OptimizeCSSAssetsPlugin({
      asseteNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'vue',
          entry: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js', // vue 基础库的cdn链接，表示这个基础库要去这个url上拉取
          global: 'Vue',
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      minSize: 0, // 提取的公共文件最小体积为0
      cacheGroups: {
        commons: {
          name: 'vendors',
          chunks: 'all',
          minChunks: 2, // 公共文件最少被两个不同的文件引用
        },
      },
    },
  },
};

module.exports = merge(prodConfig, baseConfig);
