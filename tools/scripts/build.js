'use strict'

process.env.NODE_ENV = 'production'

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const paths = require('../config/paths')
const config = require('../config/webpack.config.prod')
const clearConsole = require('react-dev-utils/clearConsole')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const FileSizeReporter = require('react-dev-utils/FileSizeReporter')
const fileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
const fileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

fileSizesBeforeBuild(paths.buildDir).then(previousFileSizes => {

   console.log(chalk.yellow('Cleaning out build folder...'))

   // Clean out our previous build folder
   fs.emptyDirSync(paths.buildDir)

   // Create new webpack build
   build(previousFileSizes)
})

// Print out errors
function printErrors(summary, errors) {
  console.log(chalk.red(summary))
  console.log()
  errors.forEach(err => {
    console.log(err.message || err)
    console.log()
  })
}

function build(previousFileSizes) {

   clearConsole()

   console.log('Creating a new production build...')
   console.log()

   webpack(config).run((err, stats) => {
      if (err) {
         printErrors('Failed to compile.', [err])
         process.exit(1)
      }

      if (stats.compilation.errors.length) {
         printErrors('Failed to compile.', stats.compilation.errors)
         process.exit(1)
      }

      if (process.env.CI && stats.compilation.length) {
         printErrors('Failed to compile. When process.env.CI = true, warnings are treated as failures. Most CI servers set this automatically.', stats.compilation.warnings)
         process.exit(1)
      }

      console.log(chalk.green('Production build complete!'))
      console.log()

      console.log('File sizes after gzip:')
      console.log()
      fileSizesAfterBuild(stats, previousFileSizes)
      console.log()

      console.log('New build directory is located at:')
      console.log(chalk.green(paths.buildDir))
      console.log()

   })
}
