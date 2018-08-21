const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const debug = process.env.NODE_ENV!=="production";
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const browserConfig = {
  entry: "./src/browser/index.js",
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  devtool: debug?"cheap-module-source-map":false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
         fallback: 'style-loader',
          use: [
            {
              loader: "css-loader",
              options: { importLoaders: 1, modules:true, localIdentName: '[name]__[local]___[hash:base64:5]' }
            }
          ]
        })
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react-app"] }
      }
    ]
  },
  plugins:debug?[
  new ExtractTextPlugin({
      filename: "public/css/[name].css"
    }),
    new webpack.BannerPlugin({
      banner: "__isBrowser__ = true;",
      raw: true,
      include: /\.js$/
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
    ]:[
    new ExtractTextPlugin({
      filename: "public/css/[name].css"
    }),
    new webpack.BannerPlugin({
      banner: "__isBrowser__ = true;",
      raw: true,
      include: /\.js$/
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
     new UglifyJsPlugin()
  ]
};

const serverConfig = {
  entry: "./src/server/index.js",
  target: "node",
  output: {
    path: __dirname,
    filename: "server.js",
    libraryTarget: "commonjs2"
  },
  devtool: debug?"cheap-module-source-map":false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader/locals",
            options: { importLoaders: 1, modules:true, localIdentName: '[name]__[local]___[hash:base64:5]' }
          }
        ]
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react-app"] }
      }
    ]
  },
  plugins:debug?[
    new webpack.BannerPlugin({
      banner: "__isBrowser__ = true;",
      raw: true,
      include: /\.js$/
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV)
    })
  ]:[
    new webpack.BannerPlugin({
      banner: "__isBrowser__ = true;",
      raw: true,
      include: /\.js$/
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV)
    }),
    new UglifyJsPlugin()
  ]
};

module.exports = [browserConfig, serverConfig];