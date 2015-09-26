var gulp = require('gulp'),
	svgmin = require('gulp-svgmin');

gulp.task('default', function () {
	return gulp.src('src/**/*.svg')
		.pipe(svgmin())
		.pipe(gulp.dest('dest'));
});
