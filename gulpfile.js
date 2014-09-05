//Dependencies
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    prefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    imagemin = require ('gulp-imagemin'),
    browserSync = require('browser-sync');
    reload = browserSync.reload;
    notify = require('gulp-notify');

//Default
gulp.task('default', ['browser-sync', 'watch']);

//BrowserSync
// `jekyll serve --watch` must be run first
gulp.task('browser-sync', function() {
  browserSync({
    proxy: "localhost:4000"
  });
});

//Sass
gulp.task('sass', function () {
  gulp.src('styles/main.scss')
    .pipe(sass({style: 'compressed'}))
    .pipe(prefix('last 2 version', 'ie 9'))
    .pipe(gulp.dest('assets/css'))
    .pipe(reload({stream:true}));
});

// JavaScript
gulp.task('js', function () {
  return gulp.src('scripts/*.js')
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/js'))
    .pipe(reload({stream:true}));
});

// Image Compression
gulp.task('images', function () {
  return gulp.src('img/*')
    .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
    .pipe(gulp.dest('img'));
});

//Watch
gulp.task('watch', function () {
  gulp.watch('styles/**/*.scss', ['sass']);
  gulp.watch('scripts/*.js', ['js']);
  gulp.watch('img/*', ['images']);
});