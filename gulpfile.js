/*
 * StartQuick v1.0.0-beta.1 (https://bsdadm.com/projects/quickstart)
 * Copyright 2020 StartQuick Authors (https://github.com/davidsaulrodriguez/quickstart/graphs/master)
 * Licensed under BSD 2 Clause (https://github.com/davidsaulrodriguez/quickstart/blob/master/LICENSE)
 */

/* Required dependencies... Don't touch! */
const del = require('del');
const sass = require('gulp-sass');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const sourcemap = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const {task, src, dest, watch, series, parallel } = require('gulp');
/* Required dependencies... Don't touch! */

var reload = browserSync.reload;

/* Configuration variables and their values. If you're going to make a change to the
configuration of the file structre, it should be done here. */

var jsSrc = '/src/js/**'
var imgSrc = '/src/imgs/**'
var styleSrc = '/src/scss/**'

/* Where the live server build should go */
var devRoot = 'dev/';
var jsDevDist = 'dev/assets/js';
var imgDevDist = 'dev/assets/imgs';
var styleDevDist = 'dev/assets/css';

/* Where the production ready build should go */
var distRoot = './';
var jsDist = './assets/js';
var imgDist = './assets/imgs';
var styleDist = './assets/css';

/**
 * DEVLOPMENT TASKS
 */

task('scss', function() {
  return src(['node_modules/bootstrap/scss/bootstrap.scss',
  'src/scss/**.scss'])
  .pipe(sourcemap.init())
  .pipe(sass({
    outputStyle: 'expanded'
  }))
  .pipe(autoprefixer({
    Browserslist: ['last 4 versions'],
    cascade: false
  }))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(sourcemap.write('./maps'))
  .pipe(dest(styleDevDist))
  .pipe(browserSync.stream());
});

task('js', function(){
  return src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/popper.js/dist/umd/popper.min.js',
  'src/js/**'])
  .pipe(minify({
    noSource: true,
    preserveComments: 'some',
    ext: {
      src: '.js',
      min: '.min.js',
    },
    ignoreFiles: ['**.min.js']
  }))
  .pipe(dest(jsDevDist))
  .pipe(browserSync.stream());
});

task('imgs', function() {
  return src(['src/imgs/**'])
  .pipe(dest(imgDevDist))
  .pipe(browserSync.stream());
});

task('html', function() {
  return src(['src/*.html'])
  .pipe(dest(devRoot))
  .pipe(browserSync.stream());
});

/**
 * PRODUCTION TASKS
 * Tasks used when compiling for Production Ready Deployment
 */

task('scss-dist', function() {
  console.log("\t\tCompiling your Sass files...");
  return src(['node_modules/bootstrap/scss/bootstrap.scss',
  'src/scss/**',
  'src/scss/!*.scss'])
  .pipe(sourcemap.init())
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(autoprefixer({
    Browserslist: ['last 4 versions'],
    cascade: false
  }))
  .pipe(rename({
    suffix: '.min',
    extname: '.css'
  }))
  .pipe(dest(styleDist))
  .pipe(sourcemap.write('./maps'))
  .pipe(browserSync.stream());
});

task('js-dist', function(){
  console.log("\t\tCompiling your JavaScript files...");
  return src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/popper.js/dist/umd/popper.min.js',
  'src/js/**.js'])
  .pipe(sourcemap.init())
  .pipe(minify({
    noSource: true,
    preserveComments: 'some',
    ext: {
      src: '.js',
      min: '.min.js',
    },
    ignoreFiles: ['**.min.js']
  }))
  .pipe(sourcemap.write('./maps'))
  .pipe(dest(jsDist))
  .pipe(browserSync.stream());
});

task('imgs-dist', function() {
  console.log("\t\tAdding your Image files...");
  return src(['src/imgs/**'])
  .pipe(dest(imgDist))
  .pipe(browserSync.stream());
});

task('html-dist', function() {
  console.log("\t\tAdding your HTML files...");
  return src(['src/*.html'])
  .pipe(dest(distRoot))
  .pipe(browserSync.stream());
});

task('watch', function() {
  watch(['src/imgs/**'], series('imgs'));
  watch(['src/scss/**'], series('scss'));
  watch(['src/js/**'], series('js'));
  watch(['src/*.html'], series('html'));
  watch('src/*.html').on('change', reload);
});

task('help', function(done) {
  console.log("\n");
  console.log("\t\t\t\tStartQuick v1.0.0-beta.1");
  console.log("\t\tcreated by: David S. Rodriguez <david@bsdadm.com>");
  console.log("\n\n");
  console.log("\tWelcome to StartQuick. This quick command guide should");
  console.log("\thelp to get you started. That way you don't have to go");
  console.log("\tdigging around in the gulpfile.js file to figure out");
  console.log("\twhat commands to use.");
  console.log("\n");
  console.log("\tSYNOPSIS:");
  console.log("\t\tgulp command");
  console.log("\n");
  console.log("\tCOMMANDS:");
  console.log("\t\tCommands are used to activate certain functionality of the");
  console.log("\t\tbuild system for this project.\n");
  console.log("\thelp\t- Help; display a summary of  these  commands.");
  console.log("\t\t  If you forget all other commands, remember this one.");
  console.log("\n");
  console.log("\tfresh\t- Delete the 'dev/' and 'built/' folders that contain");
  console.log("\t\t  your compiled project files, for use with the live server");
  console.log("\t\t  and production build, respectively.");
  console.log("\n");
  console.log("\tclean\t- Delete the 'dev/' folder that contains your compiled");
  console.log("\t\t  project, for use with the live server.");
  console.log("\n");
  console.log("\tcompile\t- This command compassetsiles and builds all of your source");
  console.log("\t\t  code into a folder called 'built/' that is in the root");
  console.log("\t\t  directory of this project, for deploying into production.");
  console.log("\n");
  console.log("\tstart\t- This command starts the live development server.");
  console.log("\t\t  It will also launch your default web browser, automatically");
  console.log("\t\t  navigating you to the live development server and enabling");
  console.log("\t\t  live reloading of your site upon saving your changes.");
  console.log("\n");
  console.log("\tCopyright (c) 2020 David S. Rodriguez <david@bsdadm.com>");
  console.log("\n");
  done()
});

/**
 * The "build" task is used by the `gulp start` command to compile the code into
 * a folder called 'dev' where files are stored for and served to the live server
 */
task('build', parallel('imgs', 'scss', 'js', 'html'));

/**
 * The "dist" task is used by the `gulp compile command to compile the code into
 * a folder called 'built'. This is where the production ready files are stored.
 */
task('dist', parallel('imgs-dist', 'scss-dist', 'js-dist', 'html-dist'));

/**
 * This "serve" task is used to serve our HTML files to the browser using BrowserSync.
 */
task('serve', series('build', function(done) {
  browserSync.init({
    server:{
      baseDir: './dev',
      proxy: 'localhost:3000',
      port: 3000,
      open: true
    }
  });
  done();
}));

task('removeDev', function (){
  console.log("\t\tCleaning up and removing the 'dev/' directory.");
  return del([
    './dev/'
  ])
});

task('cleanUp', function (){
  console.log("\t\tCleaning up and removing the 'dev/' and 'built/' directories.");
  return del([
    './dev/',
    './assets/',
    './*.html'
  ], {force: true})
});

// Simply running 'gulp' or 'gulp help' should display a man page
task('default', series('help'));

task('compile', series('dist'));

task('start', series('serve', 'watch'));

task('clean', series('removeDev'));

task('fresh', series('cleanUp'));
