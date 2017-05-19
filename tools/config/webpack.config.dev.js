const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./paths')
const path = require('path')

let publicPath = '/'
let publicUrl = ''

module.exports = {
   context: __dirname,
   devtool: 'eval',

   entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      paths.appIndexJs
   ],
   output: {
      path: paths.publicDir,
      pathinfo: true,
      filename: 'assets/[name].js',
      publicPath: publicPath
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
            use: [
               'style-loader',
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
            // loaders: ['style-loader', 'css-loader']
            // loader: 'style-loader!css-loader?modules=true&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!postcss-loader!sass-loader'
            // loader: 'style-loader!css-loader?modules=true&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!postcss-loader'
         },
         {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loaders: ['file-loader']
         }
      ]
   },

   plugins: [
      new webpack.HotModuleReplacementPlugin(),

      // Generates an `index.html` file with scripts injected
      new HtmlWebpackPlugin({
         inject: true,
         template: paths.appIndexHtml
      }),

      // new webpack.LoaderOptionsPlugin({
      //    options: {
      //       postcss: [
      //          autoprefixer({
      //         browsers: [
      //           '>1%',
      //           'last 4 versions',
      //           'Firefox ESR',
      //           'not ie < 9', // React doesn't support IE8 anyway
      //         ]
      //       })
      //       ]
      //    }
      // }),

      new webpack.NamedModulesPlugin(),

   ]

}

console.log('Running with webpack.config.dev')
