const { src, dest, watch, series, parallel } = require("gulp");
const fileInclude = require("gulp-file-include");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const csso = require("gulp-csso");
const prefix = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const jsmin = require("gulp-jsmin");
const newer = require("gulp-newer");
const imageMin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

sass.compiler = require('node-sass');

const html = function () {
    return src("src/**/*.html")
        .pipe(fileInclude({ prefix: "@@" }))
        .pipe(dest("dist/"))
        .pipe(browserSync.stream());
}

const styles = function () {
    return src(["src/scss/*.scss", "src/scss/*.css"])
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "compressed" }))
        .pipe(prefix())
        .pipe(csso())
        .pipe(sourcemaps.write("."))
        .pipe(dest("dist/css"))
        .pipe(browserSync.stream());
}

const scripts = function () {
    return src("src/js/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(jsmin())
        .pipe(sourcemaps.write(""))
        .pipe(dest("dist/js"))
        .pipe(browserSync.stream());
}

const img = function () {
    return src("src/images/*")
        .pipe(newer("dist/images"))
        .pipe(imageMin())
        .pipe(dest("dist/images"));
}

const server = function (cb) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        notify: false,
        open: true,
    });
    cb();
}

const observe = function (cb) {
    watch("src/**/*.html", { usePolling: true }, html);
    watch("src/scss/*", { usePolling: true }, styles);
    watch("src/js/*.js", { usePolling: true }, scripts);
    cb();
}

exports.default = series(html, styles, scripts, img);
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.img = img;
exports.watch = parallel(server, observe);