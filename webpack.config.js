const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:2000",
    "webpack/hot/only-dev-server",
    "./src/index.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, "dist"),
    port: 2000,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./dist/index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],
};
