const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist"
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: "Development"
    })
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: "style-loader?sourceMap" },
          {
            loader:
              "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]"
          },
          {
            loader: "postcss-loader?sourceMap",
            options: {
              autoprefixer: true,
              sourceMap: true
            }
          },
          { loader: "resolve-url-loader" },
          { loader: "sass-loader?sourceMap" }
        ]
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
  }
};
