const gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rimraf = require('rimraf'),
    gulpIf = require('gulp-if'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

const path = {
  build: {
    html: 'build/',
    css: 'build/css/',
  },
  src: {
    html: 'src/*.html',
    css: 'src/css/style.scss',
  },
  watch: {
    html: 'src/**/*.html',
    css: 'src/css/**/*.scss',
  },
  clean: './build'
};

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

gulp.task('html:build', function () {
  return gulp.src(path.src.html)
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});

gulp.task('css:build', function () {
  return gulp.src(path.src.css)
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(sass())
    .pipe(prefixer())
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

gulp.task('build', [
  'clean',
  'html:build',
  'css:build',
]);

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./build"
    },
    port: 8080,
    open: true,
    notify: false
  });
});

gulp.task('watch', function(){
  gulp.watch(path.watch.html, ['html:build']);
  gulp.watch(path.watch.css, ['css:build']);
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'watch', 'browserSync']);
