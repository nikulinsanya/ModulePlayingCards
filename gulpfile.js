var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// Основные
gulp.task('css', function () {
  gulp.src('./assets/css/*.css')
    .pipe(concatCss("style.min.css"))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./public/css/'));
    
  gulp.src('./assets/css/fight/*.css')
    .pipe(concatCss("fight.min.css"))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./public/css/'))
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src('./assets/sass/*.ccss')
    .pipe(sass("style.css"))
    .pipe(minifyCss(''))
    .pipe(rename("style.sass.min.css"))
    .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./public/css/'))
    .pipe(connect.reload());
});

gulp.task('html',function(){
    gulp.src('./assets/*.html')
    .pipe(gulp.dest('./public/'))
    .pipe(connect.reload());
});

gulp.task('fonts',function(){
    gulp.src('./assets/font/**/*')
    .pipe(gulp.dest('./public/font/'))
    .pipe(connect.reload());
});

gulp.task('js',function(){
    gulp.src('./assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'))
    .pipe(connect.reload());
});
gulp.task('jslibs',function(){
    gulp.src('./assets/js/libs/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/libs/'))
    .pipe(connect.reload());
});
gulp.task('jsmods',function(){
    gulp.src('./assets/js/modules/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/modules/'))
    .pipe(connect.reload());
});

gulp.task('img',function(){
    gulp.src('./assets/img/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('./public/img/'))
    .pipe(connect.reload());
});

// Connect
gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

// Watch
gulp.task('watch',function(){
    gulp.watch("./assets/css/**/*.css", ["css"]);
    gulp.watch("./assets/*.html", ["html"]);
    gulp.watch("./assets/js/*.js", ["js"]);
    gulp.watch("./assets/js/libs/*.js", ["jslibs"]);
    gulp.watch("./assets/js/modules/**/*.js", ["jsmods"]);
});

// Default
gulp.task('default', ["html", "css", "sass", "js","jslibs", "jsmods", "connect", "watch"]);