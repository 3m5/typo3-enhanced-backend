const gulp = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const webpackCore = require("webpack");
const webpack = require("webpack-stream");


// paths
const destCss = "../../Public/Styles";
const destJavascript = "../../Public/JavaScript";

const sourceCss = [
         './Styles/Dark.scss',
         './Styles/Features.scss'
];

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

gulp.task("js:compile", gulp.series(function (done) {
  console.log('compile in ' + argv.m + ' mode!');
  return gulp
    .src("./JavaScript/Features.js")
    .pipe(
      webpack({
        mode: argv.m,
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: [/node_modules\/(?!(swiper|dom7)\/).*/],
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"]
                }
              }
            }
          ]
        },
        output: {
          filename: "Features.js"
        },
        plugins: []
      })
    )
    .pipe(gulp.dest(destJavascript));
}));


gulp.task("watch", function () {
    gulp.watch(["./Styles/**/*.scss"], gulp.series("sass:compile"));
    gulp.watch(["./JavaScript/*.js"],  gulp.series("js:compile"));
});

gulp.task("build", gulp.series("js:compile", "sass:compile", function (done) {
    done();
}));
