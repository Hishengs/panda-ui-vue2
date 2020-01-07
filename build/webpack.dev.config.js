
const path = require('path');
const merge = require('lodash/merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config.js');
// const fs = require('fs');

const resolve = p => path.resolve(process.cwd(), p);

const template = resolve('./test/index.html');

const devConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: resolve('./test/index.js')
  },
  output: {
    path: resolve('./dev-dist'),
  },
  devServer: {
    contentBase: resolve('./dist'),
    host: 'localhost',
    port: 8787,
    compress: true,
    hot: true,
  },
});

devConfig.plugins = [
  ...devConfig.plugins,
  new HtmlWebpackPlugin({
    template,
  })
];

// fs.writeFileSync(path.join(__dirname, './webpack-config.json'), JSON.stringify(devConfig, null, 2));

module.exports = devConfig;