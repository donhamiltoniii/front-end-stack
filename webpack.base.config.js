// @flow

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const autoprefixer = require('autoprefixer');
const packageJson = require('./package.json');

const srcPath = path.join(__dirname, packageJson.config.src_dir_path);

const appPath = path.join(srcPath, '/js/app/index.js');

// Base options for HtmlWebpackPlugin for generating `index.html`
// This allows production bundle to have possibly different entry file path than webpack-dev-server
const htmlWebpackPluginOptions = {
  title: packageJson.name,
  template: path.join(srcPath, '/html/index.html'),
  favicon: path.join(srcPath, '/img/favicon.png'),
};

// Base options for WebPack
const webpackOptions = {
  entry: {
    polyfill: 'babel-polyfill',
    app: appPath,
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        use: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.woff(2)?$/,
        loader: 'url-loader',
        query: {
          limit: '10000',
          mimetype: 'application/octet-stream',
          name: 'font/[name].[hash].[ext]',
        },
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=img/[name].[hash].[ext]',
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 4,
              },
              pngquant: {
                quality: '75-90',
                speed: 3,
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HardSourceWebpackPlugin(),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        // create vendor prefixes to maximize compatibility. Recommended by Google:
        // https://developers.google.com/web/tools/setup/setup-buildtools#dont-trip-up-with-vendor-prefixes
        postcss: [
          autoprefixer({
            browsers: ['last 2 versions'],
          }),
        ],
      },
    }),

    // Split vendors from app
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource),
    }),

    // It moves every require("style.css") in entry chunks into a separate css output file.
    // So your styles are no longer inlined into the javascript, but separate in a css
    // bundle file (styles.css). If your total stylesheet volume is big, it will be faster
    // because the stylesheet bundle is loaded in parallel to the javascript bundle.
    new ExtractTextPlugin('css/app.[chunkhash].css'),
  ],

  // To suppress this warning when creating the vendor bundle:-
  //
  // WARNING in asset size limit: The following asset(s) exceed the recommended size limit (250 kB).
  // This can impact web performance.
  performance: {
    hints: false,
  },
};

module.exports = {
  htmlWebpackPluginOptions,
  webpackOptions,
};
