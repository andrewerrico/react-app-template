const chalk = require('chalk')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const paths = require('./paths')
const path = require('path')

let publicPath = '/'
let publicUrl = ''

module.exports = {
   context: __dirname,
   devtool: 'source-map',

   entry: {
      vendor: ['react', 'react-dom'],
      app: paths.appIndexJs
   },
   output: {
      path: paths.buildDir,
      pathinfo: true,
      filename: 'assets/[name].[hash].js',
      // publicPath: ''
   },

   resolve: {
      extensions: ['.js', '.jsx', '.scss', '.css'],
      modules: [paths.nodeModules, paths.appDir]
   },

   stats: {
      colors: true,
      reasons: true,
      chunks: false
   },

   module: {
      loaders: [
         {
            test: /\.(js|jsx)$/,
            exclude: paths.nodeModules,
            include: paths.appDir,
            loader: ['babel-loader']
         },

         {
            test: /\.s(a|c)ss$/,
            use: ExtractTextPlugin.extract({
               fallback: 'style-loader',
               use: [
                  {
                  loader: 'css-loader',
                  options: {
                     modules: true,
                     importLoaders: 1,
                     localIdentName: '[name]__[local]__[hash:base64:5]'
                  }
               },
               {
                  loader: 'postcss-loader',
                  options: {
                     plugins: function () {
                        return [
                          require('autoprefixer')({
                             browsers: [
                                '>1%',
                                'last 15 versions',
                                'Firefox ESR',
                                'not ie < 9', // React doesn't support IE8 anyway
                             ]
                          }),
                          require('postcss-discard-comments')({
                             removeAll: true
                          })
                        ]
                      }
                  }
               },
               'sass-loader'
            ]
         })
         },

         {
            test: /\.(png|jpe?g|gif|svg)$/i,
            // test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file-loader',
            options: {
               name: 'assets/images/[hash:base64:5].[ext]',
            }
         },

         {
            test: /\.(woff|woff2|ttf|eot)$/,
            loader: 'file-loader',
            options: {
               name: 'assets/fonts/[name].[ext]',
            }
         }
      ]
   },

   plugins: [
      new ProgressBarPlugin({
         format: chalk.bold('Build') + ' [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
         clear: false
      }),

      // Generates an `index.html` file with scripts injected
      new HtmlWebpackPlugin({
         inject: true,
         template: paths.appIndexHtml,
         minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
         }
      }),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),

      // used to split out our sepcified vendor script
      new webpack.optimize.CommonsChunkPlugin({
         name: 'vendor',
         minChunks: Infinity,
         filename: 'assets/[name].[hash].js',
      }),


      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
         compressor: {
            screw_ie8: true,
            warnings: false
         },
         mangle: {
            screw_ie8: true
         },
         output: {
            comments: false,
            screw_ie8: true
         }
      }),

      new webpack.NamedModulesPlugin(),

      new ExtractTextPlugin('assets/[name].[contenthash].css')

   ]

}

console.log('Running with webpack.config.prod')
