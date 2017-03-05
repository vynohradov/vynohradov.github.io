var 
    gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    scss = require('gulp-scss'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify');



gulp.task('scss', function(){
    return gulp.src("./scss/*.scss")
        .pipe(scss())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

gulp.task('js', function(){
    return gulp.src('./src/js/*.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

gulp.task('js:watch', ['js'], function(done){
    browserSync.reload();
    done();
});

gulp.task('serve', ['scss', 'js'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./scss/*.scss", ['scss']);
    gulp.watch("./js/*.js", ['js:watch']);
    gulp.watch("./*.html").on('change', browserSync.reload);


});




gulp.task('default', ['serve']);