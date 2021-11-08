'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');

gulp.task('sass', function (cb) {
	gulp
		.src('./sass/*.scss')
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(gulp.dest('./css'));
	cb();
});

gulp.task('watch', function () {
	gulp.watch(['./sass/*'], gulp.series('sass'));
});
