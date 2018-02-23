const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob')
const webpack = require('webpack')

const HeaderCssFileExtractor = new ExtractTextPlugin('style/header.min.css?[hash]');

let items = {};
for(let file of  glob.sync("./src/components/**/!(*.test).js")){
  const key = path.basename(file, '.js')
console.log(file)
  items[key.toLowerCase()] = file;
}

module.exports = {
  entry: items,

  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },

  output: {
    filename: '[name].js?[hash]',
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
        use: HeaderCssFileExtractor.extract({
          fallback: "style-loader",
          use: [

            {
              loader: 'css-loader', //?modules&importLoaders=1&localIdentName=[hash:base64:5]
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: "[hash:base64:8]"
              }

            },

            {
              loader: 'postcss-loader',
              options: {
                autoprefixer: true,
                sourceMap: false
              }
            },
            { loader: 'resolve-url-loader' },
            { loader: 'sass-loader' }
          ]
        })

      },
    ]
  },


  // plugins: [
  //   new CleanWebpackPlugin(['dist']),
  //   new HtmlWebpackPlugin({
  //     title: 'Development'
  //   })
  // ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
      , sourceMap: false
    }),
    HeaderCssFileExtractor,
  ],
};