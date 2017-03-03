const gulp = require("gulp");

gulp.task("build-assets", () => {
  return gulp.src("assets/**/*").pipe(gulp.dest("docs"));
});
