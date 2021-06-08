// 多入口 webpack 配置
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const glob = require('glob');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const webpack = require('webpack');
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
    htmlPlugins
  }
}

let {entries,htmlPlugins} = setMPA();

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: ['vue-loader', 'eslint-loader'],
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
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 46.875,
              remPrecision: 8,
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
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new VueLoaderPlugin(),
    new OptimizeCSSAssetsPlugin({
      asseteNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
    }),
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
    new webpack.optimize.ModuleConcatenationPlugin(),
  ].concat(htmlPlugins),
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
    extensions: ['.vue', '.js', '.css', '.less'],
  },
  optimization: {
    splitChunks: {
      minSize: 0, // 提取的公共文件最小体积为0
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 3, // 公共文件最少被两个不同的文件引用
        },
      },
    },
  },
}; 