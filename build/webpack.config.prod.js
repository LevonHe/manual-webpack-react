const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssnano = require('cssnano');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: '[name]_[chunkhash:8].main.js',
    chunkFilename: '[name]_[chunkhash:8].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('autoprefixer')({
                  overrideBrowserslist: ['last 2 version', '>1%', 'ios 7'],
                }),
                require('cssnano')(),
              ],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('autoprefixer')({
                  overrideBrowserslist: ['last 2 version', '>1%', 'ios 7'],
                }),
                require('cssnano')(),
              ],
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:8].css',
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
    }),
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
  // webpack?????????????????????
  performance: {
    hints: 'warning',
    // ???????????????????????????
    maxEntrypointSize: 50000000,
    // ???????????????????????????
    maxAssetSize: 30000000,
    // ?????????js???css?????????????????????
    assetFilter: function assetFilte(assetFilename) {
      return assetFilename.endsWith('.js') || assetFilename.endsWith('.css');
    },
  },
});
