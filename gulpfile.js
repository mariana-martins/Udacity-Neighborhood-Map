var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var bower = require('gulp-bower');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');

gulp.task('default', ['load-env-vars'], function() {
    browserSync.init({
        server: 'src'
    });
    gulp.watch('src/**/*').on('change', browserSync.reload);
});

// create a js file with global values
gulp.task('load-env-vars', function() {
    require('dotenv').config();
    // Declare global variables based on dotenv.
    var vars = 'var global = (function() { return {' +
        'zomatoUserKey: "' + process.env.ZOMATO_USER_KEY + '",' +
        'googleMapsKey: "' + process.env.GOOGLEMAPS_KEY + '",' +
        '};})();';
    // Save global variables on global.js file.
    require('fs').writeFileSync('src/scripts/global.js', vars);
});

// Run bower
gulp.task('bower', function() {
    return bower();
});

gulp.task('dist', ['minify', 'copy-bower', 'copy-image']);

// Minify project
gulp.task('minify', ['minify-js', 'minify-css', 'minify-html']);

gulp.task('minify-js', ['load-env-vars'], function () {
    return gulp.src(['src/scripts/*.js'])
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
    return gulp.src(['src/*.html'])
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

// Copy bower resources to dist
gulp.task('copy-bower', function () {
    return gulp.src(['src/components/**/*'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('dist/components'));
});

// Copy image resources to dist
gulp.task('copy-image', function () {
    return gulp.src(['src/*.png'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('dist'));
});
