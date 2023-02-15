const gulp = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const webpackCore = require("webpack");
const webpack = require("webpack-stream");


// paths
const destCss = "../../Public/Styles";

const sourceCss = [
         '../Styles/Vanilla.scss',
         '../Styles/Dark.scss'
    ]

// handle arguments
const argv = require('yargs').option({
    'mode': {
        alias: 'm',
        demandOption: false,
        default: 'development',
        describe: 'Choose a build mode..',
        type: 'string'
    }
}).argv;

gulp.task("sass:compile", gulp.series(function (done) {
    gulp
        .src(sourceCss)
        .pipe(sass().on("error", sass.logError))
        .pipe(
            postcss([
                autoprefixer(),
                cssnano()
            ])
        )
        .pipe(gulp.dest(destCss));
    done();
}));



gulp.task("watch", function () {
    gulp.watch(["../Styles/**/*.scss"], gulp.series("sass:compile"));
});

gulp.task("build", gulp.series("sass:compile", function (done) {
    done();
}));
