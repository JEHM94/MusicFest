// Example task
// function myTask(callback) {
//     console.log('My first task');

//     callback();
// }

// exports.myTask = myTask;

// CSS
const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require('gulp-plumber');
// POST CSS
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
// Images
const webp = require('gulp-webp');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const avif = require('gulp-avif');
// POST Javascript
const terser = require('gulp-terser-js');

// Functions CSS *********
function compileCss(done) {
    src("src/scss/**/*.scss") // Identify the SASS file
        .pipe(sourcemaps.init()) // Start css identification through sourcemaps
        .pipe(plumber()) // Prevents workflow from stopping
        .pipe(sass()) // Compile sass
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.')) // Write the sourcemaps on '.' the same folder
        .pipe(dest("build/css")) // Save css into build

    done(); // Tells gulp that the Task has reached the end of the function
}

// Functions Images *********
function convertToWebp(done) {
    const options = {
        quality: 50,
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(options))
        .pipe(dest('build/img'));

    done();
}

function convertToAvif(done) {
    const options = {
        quality: 50,
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(options))
        .pipe(dest('build/img'));

    done();
}

function reduceImageSize(done) {
    const options = {
        optimizationLevel: 3,
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(options)))
        .pipe(dest('build/img'));

    done();
}

// Functions JS *********
function compileJS(done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init()) // Start css identification through sourcemaps
        .pipe(terser()) // Post JS
        .pipe(sourcemaps.write('.')) // Write the sourcemaps on '.' the same folder
        .pipe(dest('build/js'));

    done();
}

// Watcher *********
function watchChanges(done) {
    watch("src/scss/**/*.scss", compileCss); // Watch for changes on app.scss then run compileCss
    watch("src/js/**/*.js", compileJS); // Watch for changes on app.js then run compileJS

    done();
}


// Exports *********
// Individuals
exports.compileCss = compileCss;
exports.compileJS = compileJS;
exports.watchChanges = watchChanges;
exports.convertToWebp = convertToWebp;
exports.convertToAvif = convertToAvif;
exports.reduceImageSize = reduceImageSize;
// Dev / Build
exports.build = parallel(reduceImageSize, convertToWebp, convertToAvif, watchChanges);