const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Development'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
          test: /\.(scss|css)$/,
          use: [
              {loader: 'style-loader?sourceMap'},
              {loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]'},
              {
                  loader: 'postcss-loader?sourceMap',
                  options: {
                      autoprefixer: true,
                      sourceMap: true
                  }
              },
              {loader: 'resolve-url-loader'},
              {loader: 'sass-loader?sourceMap'}
          ]
      },
    ]
  }
};