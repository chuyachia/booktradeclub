const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const debug = process.env.NODE_ENV!=="production"


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
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, "")
        }
      },
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
     new webpack.optimize.UglifyJsPlugin({
      minimize: true
    })
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
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, ""),
          emit: false
        }
      },
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
  plugins: [
    new webpack.BannerPlugin({
      banner: "__isBrowser__ = false;",
      raw: true,
      include: /\.js$/
    })
  ]
};

module.exports = [browserConfig, serverConfig];