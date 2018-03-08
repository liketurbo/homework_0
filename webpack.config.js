import path from 'path';
import glob from 'glob';
import webpack from 'webpack';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import PurifyCSSPlugin from 'purifycss-webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const inProduction = process.env.mode === 'production';

export default {
  entry: {
    app: [
      './src/scripts/main.js',
    ],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new webpack.LoaderOptionsPlugin({
      minimize: inProduction,
    }),
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, './src/index.html')),
      minimize: inProduction,
    }),
    new CleanWebpackPlugin(['build'], {
      root: __dirname,
      verbose: false,
      dry: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      hash: true,
    }),
  ],
};
