const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: ['./src/index.js'],
  },
  watch: true,
  watchOptions: {
    ignored: ['__tests__', 'node_modules'],
    aggregateTimeout: 300,
    poll: 500,
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
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
    modules: ['node_modules', 'css/fonts'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/',
    historyApiFallback: true,
    inline: true,
    host: '0.0.0.0',
    port: '8080',
  },
};
