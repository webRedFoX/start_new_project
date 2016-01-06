// //////////////////////////////////////////////////
// Required
// //////////////////////////////////////////////////

var gulp           = require('gulp'),
    sass           = require('gulp-sass'),
    autoprefixer   = require('gulp-autoprefixer'),
    uglify         = require('gulp-uglify'),
    rigger         = require('gulp-rigger'),
    sourcemaps     = require('gulp-sourcemaps'),
    rename         = require('gulp-rename'),
    notify         = require('gulp-notify'),
    browserSync    = require('browser-sync'),
    reload         = browserSync.reload,
    del            = require('del');


// //////////////////////////////////////////////////
// Default Tasks
// //////////////////////////////////////////////////

gulp.task('default', ['assemble', 'watch']);

gulp.task('assemble', [
    'html',
    'scripts',
    'styles',
    'browser-sync'
]);

// //////////////////////////////////////////////////
// Watch Tasks
// //////////////////////////////////////////////////

gulp.task('watch', function () {
    gulp.watch('./app/js/**/*.js', ['scripts']);
    gulp.watch('./app/sass/**/*.sass', ['styles']);
    gulp.watch('./app/**/*.html', ['html']);
});


// //////////////////////////////////////////////////
// Browser Sync Tasks
// //////////////////////////////////////////////////

gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: './build/'
        }
    });
});


// //////////////////////////////////////////////////
// Html Tasks
// //////////////////////////////////////////////////

gulp.task('html', function(){
   gulp.src('./app/*.html')
       .pipe(rigger())
       .pipe(gulp.dest('./build/'))

       .pipe(notify('HTML Done'))
       .pipe(reload({stream: true}));
});

// //////////////////////////////////////////////////
// Styles Tasks
// //////////////////////////////////////////////////

gulp.task('styles', function(){
    gulp.src('app/sass/styles.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css'))

        .pipe(notify('CSS Done'))
        .pipe(reload({stream: true}));
});

// //////////////////////////////////////////////////
// Scripts Tasks
// //////////////////////////////////////////////////

gulp.task('scripts', function () {
    gulp.src('./app/js/common.js')
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/js'))

        .pipe(notify('JavaScript Done'))
        .pipe(reload({stream: true}));
});



// //////////////////////////////////////////////////
// Build Tasks
// //////////////////////////////////////////////////

gulp.task('build:cleanfolder', function(){
    del(['./build/**']);
});

gulp.task('build:copy', function(){
    return gulp.src('./app/**/*/')
        .pipe(gulp.dest('./build/'));
});

gulp.task('build:remove', ['build:copy'], function(){
    del([
        './build/sass/',
        './build/templates/'
    ]);
});

gulp.task('build', ['build:cleanfolder', 'build:copy', 'build:remove']);
