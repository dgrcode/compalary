'use strict';

const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-sourcemap',
  entry: {
    index: path.join(__dirname, 'src', 'index.jsx')
  },
  devServer: {
    inline: true,
    hot: true,
    compress: true,
    port: 3334,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: {
      index: '/index.html'
    }
  },
  output: {
    path: path.join(__dirname, 'dist', 'js'),
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: path.join(__dirname, 'src'),
        exclude: /\.sass$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: 'babel_cache',
            presets: ['react', 'es2015', 'stage-2']
          }
        }
      },
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
