var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var pump = require('pump');
var babel = require('gulp-babel');
var rename = require("gulp-rename");
//var concat = require('gulp-concat');

// Compiles ES6+ to ES5
// gulp babel
gulp.task('babel', () =>
    gulp.src('src/app.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist'))
);

// Compiles sass to css
// gulp sass
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(gulp.dest('./themes/maintheme'));
});

// Minifies all css
// gulp cssmin
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

// Compiles all ES6+ to ES6 and minifies the .js files
// gulp js
gulp.task('js', function (cb) {
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

// Compile and minify app.js file only
// gulp appglify
gulp.task('appuglify', function (cb) {
  pump([
        gulp.src('./js/app.min.js'),
        babel({presets: ['env']}),
        uglify(),
        gulp.dest('./js/')
    ],cb);
});

// =============================================================
// =================== DEFAULT TASK CSS + JS ===================
// =============================================================
// gulp
gulp.task('default', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./css/src/**/*.css', ['cssmin']);
    gulp.watch('./js/src/**/*.js', ['js']);
});

// =============================================================
// ===================== CSS COMPILE ONLY ======================
// =============================================================
// gulp css
gulp.task('css', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./css/src/**/*.css', ['cssmin']);
  });

// =============================================================
// Concatenates css files (not including!)
// gulp concatcss
// gulp.task('concatcss', function() {
//   return gulp.src('./css/minified/**/*.css')
//     .pipe(concat('allext.css'))
//     .pipe(gulp.dest('./css'));
// })
    
// Concatenates js files (not including!)
// gulp concatjs
// gulp.task('concatjs', function() {
//   return gulp.src('./js/minified/**/*.js')
//     .pipe(concat('allext.js'))
//     .pipe(gulp.dest('./js'));
// });