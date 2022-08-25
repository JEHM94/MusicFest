// Example task
// function myTask(callback) {
//     console.log('My first task');

//     callback();
// }

// exports.myTask = myTask;
const {src, dest, watch} = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require('gulp-plumber');

function compileCss(done){
    src("src/scss/**/*.scss") // Identify the SASS file
    .pipe(plumber())
    .pipe(sass()) // Compile it
    .pipe(dest("build/css")) // Save it

    done(); // Tells gulp that the Task has reached the end of the function
}

function watchScssChanges(done){
    watch("src/scss/**/*.scss", compileCss); // Watch for changes on app.scss then run compileCss

    done();
}

exports.compileCss = compileCss;
exports.watchScssChanges = watchScssChanges;