const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    path.resolve(__dirname, 'src/index.js'),
    path.resolve(__dirname, 'src/telefon.js')
  ],
  module: { rules: [{ test: /\.js$/, use: 'babel-loader' }] },
  plugins: [new HtmlWebpackPlugin({ template: 'src/index.html' })]
};
