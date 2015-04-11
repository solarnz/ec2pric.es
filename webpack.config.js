var webpack = require('webpack');
var ngAnnotate = require('ng-annotate-webpack-plugin');

module.exports = {
    entry: 'babel!./app/scripts/app.js',
    output: {
        filename: 'ec2prices_webpack.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader?stage=0'
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          loader: 'html'
        }
      ]
    },
    plugins: [
      new ngAnnotate({
        add: true,
      }),
      new webpack.optimize.UglifyJsPlugin()
    ]
};
