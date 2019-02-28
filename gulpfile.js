const gulp = require('gulp');
const del = require('del');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const tsify = require('tsify');
const tslint = require('gulp-tslint');
const uglify = require('gulp-uglify');

function clean() {
  return del(['dist']);
}

function build(done) {
  gulp.series(
    clean,
    linter,
    ts,
  )(done);
}

function run(done) {
  gulp.series(
    build,
    watchers,
  )(done);
}

function watchers() {
  gulp.watch('./src/**/*.ts', gulp.series(linter, ts));
}

function linter() {
  return gulp.src('./src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report());
}

function ts() {
  return browserify().add('./src/index.ts')
    .plugin(tsify)
    .bundle().on('error', function (error) {
      console.error(error.toString());
    })
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
}

gulp.task('build', build);
gulp.task('default', run);
