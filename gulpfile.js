'use strict'
let gulp = require('gulp');
let rename = require('gulp-rename');
let sourcemaps   = require('gulp-sourcemaps');
let connect = require('gulp-connect');

let css_path = "src/css/*.*";
let css_path_final = 'public/assets/css';

let js_path = "src/scripts/*.*";
let js_path_final = "public/assets/scripts";

let html_path = "src/**/*.html";
let html_path_final = 'public';

let images_path = "src/images/*.*";
let images_path_final = "public/assets/images_prod";

gulp.task('images', function(cb) {
  let imageop = require('gulp-image-optimization');
    return gulp.src(images_path).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest(images_path_final))
})
gulp.task('css',function(){
  let postcss      = require('gulp-postcss');
  let autoprefixer = require('autoprefixer');
  let sass = require('gulp-sass');
  let cssnano = require('cssnano')
  return gulp.src(css_path)
  .pipe(rename((path)=>{
    path.basename += ".min";
  }))
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) , cssnano()]))
  .pipe(sourcemaps.write("."))
  .pipe(gulp.dest(css_path_final))
  .pipe(connect.reload());
})  

gulp.task('html',function(){
  return gulp.src(html_path)
  .pipe(gulp.dest(html_path_final))
  .pipe(connect.reload());
})

gulp.task('js',function(){
  let gulp_webpack = require('gulp-webpack');
  let webpack = require("webpack");

  gulp_webpack({
      devtool:"source-map",
      resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts','.tsx', '.js'],
      },
      entry: {
        main: __dirname + "/src/scripts/main.jsx"
      },
      output: {
          path: __dirname + "/public/scripts",
          filename: "[name].min.js"
      },
      plugins: [/*
          new webpack.optimize.UglifyJsPlugin({
              mangle:true
          }),
          new webpack.DefinePlugin({
            "process.env": {
              NODE_ENV: JSON.stringify("production")
            }
          })
          */
        ],
      module: {
        loaders: [
          {
            test: /\.scss$/,
            loaders: [
                'style',
                'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                'sass'
            ]
          },
          { test: /\.ts$|\.tsx$/, loader: 'ts-loader' },
          {
            test: /\.jsx?$|\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
              presets: ['react', 'es2015']
            }
          }
        ]
      }
    })
    .pipe(gulp.dest(js_path_final))
    .pipe(connect.reload());
})

gulp.task('default',["js","html","css"])

gulp.task('watch',()=>{
  gulp.watch('src/css/**/**.scss',['css']);
  gulp.watch('src/scripts/**/**.*',["js"]);
  gulp.watch('src/**/**.html',['html']);
  gulp.watch('src/assets/**/**.**',['move_assets']);
  connect.server({
    root: 'public',
    livereload: true
  });
});