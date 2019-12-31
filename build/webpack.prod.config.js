const merge = require('lodash/merge');
const baseConfig = require('./webpack.base.config.js');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    library: 'panda-ui',
    libraryTarget: 'commonjs2'
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  externals: {
    vue: 'vue',
  },
  /* optimization: {
    minimize: false,
  }, */
});

prodConfig.plugins = [
  new CleanWebpackPlugin(),
  ...prodConfig.plugins,
  // new BundleAnalyzerPlugin(),
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1
  }),
];

module.exports = prodConfig;