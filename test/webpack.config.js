const path = require('path');
const baseDir = process.cwd();
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const plugins = [
  new CleanWebpackPlugin(['dist']),
  // new webpack.DefinePlugin({
  //   'process.env.NODE_ENV': JSON.stringify('development')
  // }),
];

const rules = [
  {
    test: /\.vue$/,
    loader: 'vue-loader',
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  },
  // { test: /\.(png|jpg|gif|svg|ttf|eot|woff)$/, loader: 'file-loader?name=[name].[hash].[ext]' },
  { test: /\.css$/, loader: 'style-loader!css-loader' },
  { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
];

module.exports = {
  mode: 'development',
  entry: {
    app: './test/index.js',
  },
  output: {
    path: path.join(baseDir, './test/dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash:4].piece.js',
    publicPath: '/dist/',
  },
  plugins,
  module: {
    rules,
  },
  devServer: {
    hot: true,
    compress: true,
    port: 866,
    inline: true,
    contentBase: path.join(baseDir, './test'),
  }
};
