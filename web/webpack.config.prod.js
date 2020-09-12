const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HashOutput = require('webpack-plugin-hash-output');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.[contentHash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(ttf|otf|woff|woff2|png)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      config$: path.join(__dirname, 'config', process.env.NODE_ENV),
    },
    extensions: ['*', '.js', '.jsx', '.css'],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new HashOutput({}),
  ],
};
