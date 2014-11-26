var gulp = require('gulp');
var concat = require('gulp-concat');

var js_root = './scripts/app/';
var paths = {
	js: ['app.js','routes.js','filters.js','directives.js','controllers/*','providers/*']
}

paths.js = paths.js.map(function(el) { return js_root+el;});
paths.js = paths.js.concat(['./scripts/ate.min.js']);

gulp.task('ng-concat',function() {
	gulp.src(paths.js)
	.pipe(concat('dist.js'))
	.pipe(gulp.dest('./scripts/'));
});

gulp.task('watch',function() {
	gulp.watch(paths.js,['ng-concat']);
});

gulp.task('default',['ng-concat']);
