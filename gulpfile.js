// //////////////////////////////////////////////////
// Required
// //////////////////////////////////////////////////

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),

    notify = require('gulp-notify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,

    del = require('del');



// //////////////////////////////////////////////////
// Default Tasks
// //////////////////////////////////////////////////

gulp.task('default', ['browser-sync', 'watch']);


// //////////////////////////////////////////////////
// Watch Tasks
// //////////////////////////////////////////////////

gulp.task('watch', function () {
    gulp.watch('app/js/**/*.js', ['scripts']);
    gulp.watch('app/sass/**/*.sass', ['styles']);
    gulp.watch('app/**/*.html', ['html']);
});


// //////////////////////////////////////////////////
// Browser Sync Tasks
// //////////////////////////////////////////////////

gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: 'app/'
        }
    });
});



// //////////////////////////////////////////////////
// Html Tasks
// //////////////////////////////////////////////////

gulp.task('html', function(){
   gulp.src('app/**/*.html')
       .pipe(reload({stream: true}));
});

// //////////////////////////////////////////////////
// Styles Tasks
// //////////////////////////////////////////////////

gulp.task('styles', function(){
    gulp.src('app/sass/styles.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(notify('CSS Done'))
        .pipe(gulp.dest('app/css'))
        .pipe(reload({stream: true}));
});

// //////////////////////////////////////////////////
// Scripts Tasks
// //////////////////////////////////////////////////

gulp.task('scripts', function () {
    // gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
    gulp.src('app/js/common.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/js'))
        .pipe(reload({stream: true}));
});



// //////////////////////////////////////////////////
// Build Tasks
// //////////////////////////////////////////////////

// Clear out all files and folders from build folder
gulp.task('build:cleanfolder', function(cb){
   del([
       'build/**'
   ], cb);
});

// Tasks to create build directory for all files
gulp.task('build:copy', function(){
    return gulp.src('app/**/*/')
        .pipe(gulp.dest('build/'));
});

// Task to remove unwanted build files
// List all files and directories here that you don't want to include
gulp.task('build:remove', ['build:copy'], function(cb){
    del([
        'build/sass/'
    ], cb);
});

// Build
gulp.task('build',
    [
        'build:cleanfolder',
        'build:copy',
        'build:remove'
    ]
);