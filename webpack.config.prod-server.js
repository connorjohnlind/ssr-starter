const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    server: ['./src/server.js']
  },

  output: {
    filename: 'server-bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  target: 'node',

  mode: "production",

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  externals: [webpackNodeExternals()],

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
          {
            loader: 'isomorphic-style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  browsers: ['> 1%', 'last 2 versions'],
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      { test: /\.(png|jpe?g|gif|svg)$/, loader: 'url-loader?limit=8000&name=images/[name].[ext]' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /\.(ico)$/, loader: 'file-loader?name=[name].[ext]' },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })
  ],
};
