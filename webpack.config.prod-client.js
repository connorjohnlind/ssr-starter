const path = require('path');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    client: [
      './src/client/client.jsx',
    ]
  },

  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'public')
  },

  mode: "production",

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
                minimize: {
                    safe: true
                }
            }
          },
          {
            loader: "postcss-loader",
            options: {
                autoprefixer: {
                    browsers: ["last 2 versions"]
                },
                plugins: () => [
                    autoprefixer
                ]
            },
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      { test: /\.(png|jpe?g|gif|svg)$/, loader: 'url-loader?limit=8000&name=images/[name].[ext]' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /\.(ico)$/, loader: 'file-loader?name=[name].[ext]' },
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        canPrint: true,
      },
    }),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};
