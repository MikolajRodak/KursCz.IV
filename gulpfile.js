const { src, dest, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')

const paths = {
	sass: './src/sass/**/*.scss',
	js: './src/js/**/*.js',
	img: './src/img/*',
	sassDest: './dist/css',
	jsDest: './dist/js',
	imgDest: './dist/img',
}

function sassCompiler(cb) {
	src(paths.sass)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(
			rename({
				suffix: '.mim',
			})
		)
		.pipe(dest(paths.sassDest))
	cb()
}

function javaScript(cb) {
	src(paths.js)
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(uglify())
		.pipe(
			rename({
				suffix: '.mim',
			})
		)
		.pipe(dest(paths.jsDest))
	cb()
}

function imagesMim(cb) {
	src(paths.img)
		.pipe(imagemin())
		.pipe(
			rename({
				suffix: '.mim',
			})
		)
		.pipe(dest(paths.imgDest))
	cb()
}

const functions = series(sassCompiler, javaScript, imagesMim)
exports.default = functions
