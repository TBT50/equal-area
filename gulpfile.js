const gulp = require("gulp");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");

gulp.task("sass", function() {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed"
      })
    )
    .pipe(gulp.dest("public/css"));
});

gulp.task("imagemin", () => {
  gulp
    .src("src/images/*")
    .pipe(
      imagemin([pngquant({ quality: [0.5, 0.5] }), mozjpeg({ quality: 80 })])
    )
    .pipe(gulp.dest("public/images/"));
});

gulp.task("minify", () => {
  return gulp.src("src/*.html").pipe(gulp.dest("public"));
});

gulp.task("watch", function() {
  gulp.watch("src/scss/**/*.scss", ["sass"]);
  gulp.watch("src/*.html", ["minify"]);
  gulp.watch("images/*", ["sass"]);
});

gulp.task("default", ["watch", "minify", "imagemin"]);
