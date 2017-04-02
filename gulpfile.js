var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var bower = require('gulp-bower');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');

gulp.task('default', function() {
    browserSync.init({
        server: "src"
    });
    gulp.watch("src/**/*").on('change', browserSync.reload);
});

gulp.task('bower', function() {
    return bower();
});

gulp.task('minify', ['minify-js', 'minify-css', 'minify-html']);

gulp.task('minify-js', function () {
    gulp.src(['src/scripts/*.js'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        // uglify js code
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('minify-html', function() {
    gulp.src(['src/*.html'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        // minify html
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function () {
    return gulp.src(['src/styles/*.css'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        // minify css
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/styles'));
});
