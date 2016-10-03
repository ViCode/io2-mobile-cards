const path = require('path');
const ts = require('typescript');
const $ = require('gulp-load-plugins')();

// package.json as JS object
module.exports.pkg = require(path.join(__dirname, '../package.json'));

// note: for all paths, the base dir is ../
module.exports.PATHS = {
  srcDir: 'src/components/io2-mobile-cards',
  pluginDir: 'src/components/io2-mobile-cards/plugins',
  tsSrcFiles: 'src/components/io2-mobile-cards/**/*.ts',
  releaseAssets: ['LICENSE', 'README.md'],
  jsFiles: ['gulpfile.js', 'gulp/*.js'],
  tsConfig: path.join(__dirname, '../tsconfig.json'),
  tmp: '.tmp/',
  dist: {
    base: 'dist/',
    esm: 'dist/esm/',
    bundles: 'dist/bundles/',
  }
};

module.exports.removeDeps = [
  '@angular/forms',
  '@angular/router'
];

module.exports.banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');
