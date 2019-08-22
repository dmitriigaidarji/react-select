const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('./webpack.config.js');
config.mode = 'production';


config.plugins = config.plugins.concat([
  new CleanWebpackPlugin(['build'])
]);

module.exports = config;
