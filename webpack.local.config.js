const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const dotConfig = new Dotenv({ path: './.env' });

const config = require('./webpack.config.js');
config.entry = [
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server',
  "./entry/index.tsx"
]
// config.mode = 'production'
config.mode = 'development';
config.devtool = "inline-source-map";
config.output.path = __dirname + "/build/local";
config.devServer = {
  contentBase: './build/local',
  hot: true,
  disableHostCheck: true
}
config.module.rules[0].use[0].options.transpileOnly = true;
config.plugins = config.plugins.concat([
  new CleanWebpackPlugin(['build/local']),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development'),
      'updatedAt': JSON.stringify(new Date())
    }
  }),
  dotConfig
]);
module.exports = config;
