// Defining base pathes
var paths = {
    bower: './bower_components/',
    node: './node_modules/',
    dist: './dist/',
    src: ['./src/'],
    fonts: {
        src: './src/fonts/**/*.{ttf,woff,woff2,eof,svg}',
        dest: './dist/fonts/'
    },
    images: {
        src: './src/images/**/*.{fpx,gif,jpg,jpeg,jif,jfif,jp2,jpx,j2k,j2c,pcd,pdf,png,tif,tiff}',
        dest: './dist/images/'
    },
    scripts: {
        src: './src/js/**/*.js',
        dest: './dist/js/'
    },
    styles: {
        src: './src/sass/**/*.scss',
        dest: './dist/css/'
    }
};

var gulp = require('gulp');
var addsrc = require('gulp-add-src');
var babel = require('gulp-babel');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var del = require('del');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

function assets() {
    return gulp.src(['src/**/*', '!src/fonts', '!src/fonts/**', '!src/images', '!src/images/**', '!src/js', '!src/js/**', '!src/sass', '!src/sass/**'])
        .pipe(gulp.dest(paths.dist));
}

function clean() {
    return del(paths.dist);
};

function fonts() {
    var fonts = [
        paths.node + 'font-awesome/fonts/**/*.{ttf,woff,woff2,eof,svg}',
        paths.node + 'bootstrap-sass/assets/fonts/**/*.{ttf,woff,woff2,eof,svg}',
        paths.fonts.src
    ];
    return gulp.src(fonts)
        .pipe(gulp.dest(paths.fonts.dest));
};

function images(){
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
};

function scripts() {
    var scripts = [
        paths.node + 'jquery/dist/jquery.js',
        paths.node + 'bootstrap-sass/assets/javascripts/**/*.js',
        paths.scripts.src
    ];
    return gulp.src(scripts)
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest(paths.scripts.dest));
};

function styles() {
    return gulp.src(paths.src + 'sass/app.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename({
            basename: 'styles',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest));
};

function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
};

exports.assets = assets;
exports.clean = clean;
exports.fonts = fonts;
exports.images = images;
exports.scripts = scripts;
exports.styles = styles;
exports.watch = watch;

var init = gulp.parallel(assets, fonts, images);
var build = gulp.series(clean, gulp.parallel(assets, fonts, images, scripts, styles));

gulp.task('init', init);
gulp.task('build', build);
