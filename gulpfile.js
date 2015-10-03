var autoprefixer = require('gulp-autoprefixer'),
	beml = require('gulp-beml'),
	minify = require('gulp-minify-css'),
	gulp = require('gulp'),
	htmlmin = require('gulp-htmlmin'),
	sass = require('gulp-sass'),
	svgmin = require('gulp-svgmin'),
	sync = require('browser-sync').create();

gulp.task('default', ['svg', 'html', 'styles'], function () {
	sync.init({
		notify: false,
		server: {
			baseDir: '.'
		}
	});

	gulp.watch('src/screen.scss', ['styles']);
	gulp.watch('src/index.html', ['html']);
});

gulp.task('svg', function () {
	return gulp.src('src/**/*.svg')
		.pipe(svgmin())
		.pipe(gulp.dest('dest'));
});

gulp.task('html', function() {
	return gulp.src('src/index.html')
		.pipe(beml({
			elemPrefix: '__',
			modPrefix: '--' }))
		.pipe(htmlmin({
			removeComments: true,
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('.'))
		.pipe(sync.stream());
});

gulp.task('styles', function () {
	return gulp.src('src/screen.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(minify())
		.pipe(gulp.dest('.'))
		.pipe(sync.stream());
});
