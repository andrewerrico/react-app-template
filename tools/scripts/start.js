'use strict'

process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const clearConsole = require('react-dev-utils/clearConsole')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const getProcessForPort = require('react-dev-utils/getProcessForPort')
const openBrowser = require('react-dev-utils/openBrowser')
const prompt = require('react-dev-utils/prompt')
const chalk = require('chalk');
const detect = require('detect-port');
const fs = require('fs');

const config = require('../config/webpack.config.dev')
const paths = require('../config/paths')

let DEFAULTPORT = parseInt(process.env.PORT, 10) || 8080
let bundler
let handleBundle

clearConsole()

function initWebpack(host, port, protocol) {
   bundler = webpack(config, handleBundle)

   let isFirstBundle = true

   // Webpack bundle becomes invalid when a change is detected
   bundler.plugin('invalid', function() {
      if (isFirstBundle) {
         clearConsole()
         console.log('Bundling the app...')
      } else {
         console.log()
         console.log(chalk.yellow('New changes detected'))
         console.log('Rebundling app')
         console.log()
      }
   })


   // Webpack is finish bundling
   bundler.plugin('done', function(stats) {
      if (isFirstBundle)
         clearConsole()

      let messages = formatWebpackMessages(stats.toJson({}, true))
      let isSuccessful = !messages.errors.length && !messages.warnings.length
      let showInfo = isSuccessful && isFirstBundle

      if (isSuccessful)
         console.log(chalk.green('Bundle completed dude!'))

      if (showInfo) {
         console.log()
         console.log('The app is running at:')
         console.log(protocol + '://' + host + ':' + port + '/')
         console.log()
         isFirstBundle = false
      }

      if (messages.errors.length) {
         console.log(chalk.red('Failed to compile.'));
         console.log();
         messages.errors.forEach(message => {
            console.log(message);
            console.log();
         });
         return;
      }

      // Show warnings if no errors were found.
      if (messages.warnings.length) {
         console.log(chalk.yellow('Compiled with warnings.'));
         console.log();
         messages.warnings.forEach(message => {
            console.log(message);
            console.log();
         });
         // Teach some ESLint tricks.
         // console.log('You may use special comments to disable some warnings.');
         // console.log('Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.');
         // console.log('Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.');
      }
   })
}

function initDevServer(host, port, protocol) {
   const devServer = new WebpackDevServer(bundler, {
      compress: true,
      clientLogLevel: 'none',
      contentBase: paths.publicDir,
      watchContentBase: true,
      inline: true,
      quiet: true,
      host: host,
      https: protocol === "https",
      hot: true
   })
   devServer.listen(port, err => {
      if (err)
         return console.log(err)

      console.log('Starting development server');

      openBrowser(protocol + '://' + host + ':' + port + '/')
   })
}

function run(port) {
   let protocol = 'http'
   let host = 'localhost'

   initWebpack(host, port, protocol)
   initDevServer(host, port, protocol)
}

detect(DEFAULTPORT).then(port => {
   if (port === DEFAULTPORT) {
      run(port)
      return
   } else  {
      console.log(chalk.red('SOMETHING IS ALREADY ON PORT ' + DEFAULTPORT + '.'));
   }
})
