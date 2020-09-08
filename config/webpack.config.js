const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  devServer: {
    stats: 'errors-only',
  },
  module: {
    rules: [
      // css-loader
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      // less-loader
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(gif|png|jpg|woff|svg|ttf|eot|woff2|json)\??.*$/,
        use: [
          'url-loader',
          'file-loader'
        ],
      },
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html', //本地自定义模板
      inject: true,
    }),
  ],
};
