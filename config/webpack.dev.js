// 多入口 webpack 配置
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack  = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
setMPA = () => {
  let entries = {};
  let htmlPlugins = [];
  let entryFiles = glob.sync(path.join(__dirname, '../src/*/index.js'));
  entryFiles.forEach((item) => {
    let entryFile = item;
    let entryName = entryFile.match(/src\/(.*)\/index\.js/)[1];
    entries[entryName] = item;
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `../src/${entryName}/index.html`),
        filename: `${entryName}.html`,
        chunks: [entryName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      })
    );
  });
  return {
    entries,
    htmlPlugins,
  };
}
let {entries, htmlPlugins} = setMPA();
module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
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
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  browsers: ['last 2 version', '>1%', 'ios 7'],
                }),
              ],
            },
          },
        ],
      },
      // {
      //   test: /\.(jpg|jpeg|png|gif)$/,
      //   use: [{
      //     loader: 'url-loader',
      //     options: {
      //       limit: 10240,
      //       esModule: false,
      //       publicPath: './'
      //     }
      //   }]
      // },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              publicPath: './',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'vue',
          entry: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js', // vue 基础库的cdn链接，表示这个基础库要去这个url上拉取
          global: 'Vue',
        },
      ],
    }),
  ].concat(htmlPlugins),
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
    extensions: ['.vue', '.js', '.css', '.less'],
  },
  devServer: {
    contentBase: '../dist/', // 需要热更新的文件夹
    hot: true, // 开启热更新
  },
  devtool: 'source-map',
  performance: {
    hints: false,
  },
}; 