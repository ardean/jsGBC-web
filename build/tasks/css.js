const gulp = require("gulp");

gulp.task("build-css", () => {
  return gulp.src("styles/index.css").pipe(gulp.dest("docs/styles"));
});
