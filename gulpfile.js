const gulp = require("gulp");
const autoprefixer = require('gulp-autoprefixer');

function styles(){
   return gulp.src("./style/**/*.css")
        .pipe(autoprefixer({
            overrideBrowserslist: [">0.1%"],
            cascade: false
        }))
    .pipe(gulp.dest("./build/css"));

}


gulp.task("styles", styles);
