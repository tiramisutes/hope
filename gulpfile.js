var gulp = require('gulp');
var cleancss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
/*ѹ��CSS*/
gulp.task('minify-css', function() {
  return gulp.src('./public/css/*.css')
    .pipe(cleancss())
    .pipe(gulp.dest('./public'));
});
/*ѹ��html�ļ�*/
gulp.task('minify-html', function() {
  return gulp.src('./public/**/*.html')
    .pipe(htmlclean())
    .pipe(htmlmin({
      removeComments: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }))
    .pipe(gulp.dest('./public'));
});
/*ѹ��JS�ļ�*/
gulp.task('minify-js', function() {
  return gulp.src('./public/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public'));
});
gulp.task('default', ['minify-html', 'minify-css', 'minify-js']);