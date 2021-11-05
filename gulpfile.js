'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');

gulp.task('sass', function (cb) {
	gulp
		.src('./content/sass/*.scss')
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(gulp.dest('./content/css'));
	cb();
});

gulp.task('watch', function () {
	gulp.watch(['./content/sass/*'], gulp.series('sass'));
});
