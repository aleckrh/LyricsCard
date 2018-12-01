'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

// Define paths
var paths = {
    dist: {
        base: 'dist',
        css: 'dist/css',
        js: 'dist/js',
        html: 'dist/*.html',
        img: 'dist/img/*.jpg',
    },
    base: {
        base: './',
        node: 'node_modules'
    },
    src: {
        base: 'src',
        js: 'src/js/*.js',
        scss: 'src/scss/*.scss'
    }
};

// Compile SCSS
gulp.task('scss', function () {
    return gulp.src(paths.src.scss)
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest(paths.dist.css))
        .pipe(browserSync.stream());
});

// Copy JS
gulp.task('js', function () {
    gulp.src([paths.src.js]).pipe(gulp.dest(paths.dist.js)).pipe(browserSync.stream());
});

// Live reload
gulp.task('browserSync', function () {
    browserSync.init({
        open: false,
        server: {
            baseDir: [paths.dist.base]
        },
    })
});

// Watch for changes
gulp.task('watch', ['browserSync', 'scss', 'js'], function () {
    gulp.watch(paths.src.scss, ['scss']);
    gulp.watch(paths.src.js, ['js']);
    gulp.watch(paths.dist.html, browserSync.reload);
});

// Default
gulp.task('default', function (callback) {
    runSequence(['scss', 'js', 'browserSync', 'watch'],
        callback
    )
});