// 多入口 webpack 配置
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack  = require('webpack');

module.exports = {
  entry: {
    // index: './src/index.js',
    // search: './src/search.js',
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
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      // {
      //   test: /\.(jpg|jpeg|png|gif)$/,
      //   use: [{
      //     loader: 'url-loader',
      //     options: {
      //       limit: 10240,
      //       esModule: false,
      //       publicPath: './dist'
      //     }
      //   }]
      // },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule:  false,
              publicPath: './'
            }
          },
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin(), new webpack.HotModuleReplacementPlugin()],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
    extensions: ['.vue', '.js', '.css', '.less'],
  },
  devServer: {
    contentBase: './dist/', // 需要热更新的文件夹
    hot: true, // 开启热更新
  }
}; 