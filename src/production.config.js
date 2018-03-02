const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require("glob");
const webpack = require("webpack");

const HeaderCssFileExtractor = new ExtractTextPlugin(
  "style/header.min.css?[hash]"
);

let items = {};
for (let file of glob.sync("./src/components/**/!(*.test).js")) {
  const key = path.basename(file, ".js");
  console.log(file);
  items[key.toLowerCase()] = file;
}

module.exports = function(outputDirectory = "./dist") {
  return {
    entry: items,

    devtool: "inline-source-map",
    devServer: {
      contentBase: "./dist"
    },

    output: {
      filename: "[name].js?[hash]",
      path: outputDirectory
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: "babel-loader"
        },
        {
          test: /\.(scss|css)$/,
          use: HeaderCssFileExtractor.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader", //?modules&importLoaders=1&localIdentName=[hash:base64:5]
                options: {
                  modules: true,
                  importLoaders: 1,
                  localIdentName: "[hash:base64:8]"
                }
              },

              {
                loader: "postcss-loader",
                options: {
                  autoprefixer: true,
                  sourceMap: false
                }
              },
              { loader: "resolve-url-loader" },
              { loader: "sass-loader" }
            ]
          })
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff",
          query: {
            name: "[name].min.[ext]?[hash]",
            outputPath: "fonts/", // path is combined by output.path + fileloader.outputPath
            publicPath: "/" // + outputPath
          }
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=application/octet-stream",
          query: {
            name: "[name].min.[ext]?[hash]",
            outputPath: "fonts/", // path is combined by output.path + fileloader.outputPath
            publicPath: "/" // + outputPath
          }
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file-loader",
          query: {
            name: "[name].min.[ext]?[hash]",
            outputPath: "fonts/", // path is combined by output.path + fileloader.outputPath
            publicPath: "/" // + outputPath
          }
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=image/svg+xml",
          query: {
            name: "[name].min.[ext]?[hash]",
            outputPath: "fonts/", // path is combined by output.path + fileloader.outputPath
            publicPath: "/" // + outputPath
          }
        },
        {
          test: /\.(jpg|jpeg|png|svg)$/,
          use: {
            loader: "file-loader",
            query: {
              useRelativePath: process.env.NODE_ENV === "production",
              outputPath: "imgs/", // path is combined by output.path + fileloader.outputPath
              publicPath: "/" // + outputPath
            }
          }
        }
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
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: false
      }),
      HeaderCssFileExtractor
    ]
  };
};
