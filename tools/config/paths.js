'use strict'

const { join } = require('path')

const rootDir = join(__dirname, '../../')

function resolveApp(relativePath) {
   return join(rootDir, relativePath)
}

module.exports = {
   appDir: join(rootDir, 'app'),
   publicDir: join(rootDir, 'public'),
   buildDir: join(rootDir, 'build'),
   appIndexJs: join(rootDir, 'app/index.js'),
   appIndexHtml: join(rootDir, 'tools/template/index.html'),
   nodeModules: join(rootDir, 'node_modules')
}
