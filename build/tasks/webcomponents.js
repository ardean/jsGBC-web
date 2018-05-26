const gulp = require("gulp");
const vulcanize = require("gulp-vulcanize");

gulp.task("build-webcomponents", () => {
  return gulp
    .src("index.html")
    .pipe(
      vulcanize({
        stripComments: true
      })
    )
    .pipe(gulp.dest("docs"));
});
