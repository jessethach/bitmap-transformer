const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var files = ['gulpfile.js', './lib/*.js', './test/*.js',
 '!node_modules/**', '!*.json'];

gulp.task('lint', function() {
  return gulp.src(files)
  .pipe(eslint(
    { 
      'rules': { 
        'indent': [
          2,
          2
        ],
        'quotes': [
          2,
          'single'
        ],
        'linebreak-style': [
          2,
          'unix'
        ],
        'semi': [
          2,
          'always'
        ]
      },
      'env': {
        'es6': true,
        'node': true,
        'mocha': true
      },
      'extends': 'eslint:recommended'
    }
  ))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('mocha', function() {
  return gulp.src('test/greet_test.js')
  .pipe(mocha({reporter: 'nyan'}))
  .pipe(mocha({timeout: 2000}));
});

gulp.task('watch', function() {
  return gulp.watch(files, ['lint']);
});

gulp.task('default', ['watch', 'lint', 'mocha']);