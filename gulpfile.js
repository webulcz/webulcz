var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var pump = require('pump');
//var concat = require('gulp-concat');
var babel = require('gulp-babel');
var rename = require("gulp-rename");

gulp.task('babel', () =>
    gulp.src('src/app.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(gulp.dest('./themes/maintheme'));
});

gulp.task('cssmin', function (cb) {
  pump([
        gulp.src('./css/src/**/*.css'),
        cssmin(),
        rename(function (path) {
            //path.dirname += "/dd"; path.basename += "-ff";
            path.extname = ".min" + path.extname;
        }),
        gulp.dest('./css')
    ],cb);
});

gulp.task('jsmin', function (cb) {
  pump([
        gulp.src('./js/src/**/*.js'),
        babel({presets: ['env']}),
        uglify(),
        rename(function (path) {
            //path.dirname += "/dd"; path.basename += "-ff";
            path.extname = ".min" + path.extname;
        }),
        gulp.dest('./js')
    ],cb);
});

// =================== DEFAULT TASK ===================
gulp.task('default', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./css/src/**/*.css', ['cssmin']);
  gulp.watch('./js/src/**/*.js', ['jsmin']);
});
// ====================================================


// gulp.task('concatcss', function() {
//   return gulp.src('./css/minified/**/*.css')
//     .pipe(concat('allext.css'))
//     .pipe(gulp.dest('./css'));
// })

// gulp.task('concatjs', function() {
//   return gulp.src('./js/minified/**/*.js')
//     .pipe(concat('allext.js'))
//     .pipe(gulp.dest('./js'));
// });
