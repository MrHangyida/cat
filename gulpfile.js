var fs = require("fs");
var path = require("path");
var url = require("url");

var gulp = require("gulp");
var sass = require("gulp-sass");
var webserver = require('gulp-webserver');

//编译scss
gulp.task('sass', function() {
    return gulp.src('./public/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css/'));
})

//监听
gulp.task('watch', function() {
    return gulp.watch('./public/scss/*.scss', gulp.series('sass'))
})

//启服务
gulp.task('webserver', function() {
    return gulp.src('public')
        .pipe(webserver({
            port: 8088,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                console.log(url.parse(req.url))
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return;
                }
                pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'public', pathname)));
            }
        }))
})