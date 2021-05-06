// 多入口 webpack 配置
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js',
    vueIndex: './src/vue_webpack/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.vue$/,
        use: ['vue-loader', 'vue-template-compiler'],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    // alias: {
    //   vue$: 'vue/dist/vue.esm.js',
    // },
    extensions: ['.vue', '.js', '.css', '.less'],
  },
}; 