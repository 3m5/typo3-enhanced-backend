const gulp = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
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
        default: 'production', // use mode 'development' for debugging, make sure to push only in mode 'production'
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

gulp.task('ts:compile', function() {
  return gulp
    .src('./JavaScript/Features.ts')
    .pipe(webpack({
      mode: argv.m,
      module: {
        rules: [{
          test: /\.ts$/,
          exclude: [/node_modules\/(?!(swiper|dom7)\/).*/],
          use: {
            loader: "ts-loader",
          }
        }]
      },
      output: {
        filename: 'Features.js',
      },
      resolve: {
        extensions: ['.ts']
      },
    }).on('error', function(error) {
      console.log(error);
      this.emit('end'); // Don't stop the rest of the task
    }))
    .pipe(gulp.dest(destJavascript));
});

gulp.task("watch", function () {
    gulp.watch(["./Styles/**/*.scss"], gulp.series("sass:compile"));
    gulp.watch(["./JavaScript/**/*.ts"],  gulp.series("ts:compile"));
});

gulp.task("build", gulp.series("sass:compile", function (done) {
    done();
}));
