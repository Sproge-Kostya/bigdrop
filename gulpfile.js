var gulp         = require('gulp');
var minifyCss    = require('gulp-clean-css');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
// var sourcemaps   = require('gulp-sourcemaps');
var notify       = require("gulp-notify");
var uglifyJs     = require('gulp-uglify');
var concatJs     = require('gulp-concat');


var adminLibsJsArr = [
    'web/js/lib/jquery-2.1.4.min.js',
    'web/js/lib/slick.js',
    // 'web/js/lib/AppJS.js',
];


gulp.task('adminCss', function(){
   return gulp.src('web/scss/admin/admin.scss')
       .pipe(sass().on('error', notify.onError()))
       .pipe(autoprefixer('last 4 versions'))
       .pipe(minifyCss())
       .pipe(gulp.dest('web/css'))
       .pipe(notify('Done admin css!'));
});
gulp.task('adminLibsJs', function() {
    return gulp.src(adminLibsJsArr)
        .pipe(concatJs('adminLibs.js'))
        .pipe(uglifyJs().on('error', notify.onError()))
        .pipe(gulp.dest('web/js/dist'))
        .pipe(notify('Done adminJs!'));
});


gulp.task('watcher', function(){
  gulp.watch('web/scss/admin/**/*.scss', ['adminCss']);
});

//____________________________
gulp.task('default', [
    'watcher',
    'adminCss',
    'adminLibsJs',
]);


