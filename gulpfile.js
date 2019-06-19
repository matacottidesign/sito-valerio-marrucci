//Installare prima tutti i vari plug-in


var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var sass 		= require('gulp-sass');
var cleanCSS 	= require('gulp-clean-css');
var concat		= require('gulp-concat');
var uglify 		= require('gulp-uglify');
var pipeline	= require('readable-stream').pipeline;



/*====================================================================Task copia/incolla*/
gulp.task('copyCss', function(){
	//directory copia
	return (gulp.src('node_modules/bootstrap/dist/css/*.css')
		.pipe(gulp.dest('css')));
}); 

gulp.task('copyJs', function(){
	//directory copia
	return (gulp.src("node_modules/bootstrap/dist/js/*.js")
		.pipe(gulp.dest("js")));
});
/*===========================================================================Task minify*/
gulp.task('minify', function(){
	return ( gulp.src( "css/*.css" )
		 .pipe(concat("style.min.css"))
		 .pipe(cleanCSS())
         .pipe(gulp.dest( "./" )));
});
/*===================================Task Uglify Js*/
gulp.task('uglify', function () {
	//funziona solo con il pipeline
	return pipeline(
		gulp.src('js/*.js'),
		//gulp.src('src/vendor/*.js'),
		concat("js.min.js"),
		uglify(),
		gulp.dest('js-min'),

	);

});
/*======================================Task Sass*/
'use strict';

sass.compiler = require('node-sass');

gulp.task('sass', function () {
	return gulp.src('./sass/**')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'));
});
/*=========================================================================================*/
// Save a reference to the `reload` method
// Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

	gulp.watch("*.html").on("change", reload);
	gulp.watch("sass/**").on("change", gulp.series(['sass'], ['minify'], reload));
    gulp.watch("css/*.css").on("change", gulp.series(['minify'], reload));
	gulp.watch("js/*.js").on("change", gulp.series(['uglify'], reload));
});
/*==================================================================================Task dist*/
gulp.task("dist", gulp.series(["copyCss", "minify"],  function(){
	return gulp.src([
		"**/*",
		//backtick alt+96
		`!node_modules`,
		`!node_modules/**`,
		`!fontawesome/css/*`,
		`!fontawesome/js/*`,
		`!fontawesome/metadata/*`,
		`!fontawesome/webfonts/*`,
		`!gulpfile.js`,
		`!css/*.css`,
		`!css/fontawesome/css/**`,
		`!css/fontawesome/js/**`,
		`!css/fontawesome/metadata/**`,
		`!css/fontawesome/webfonts/**`,
		`!css/fontawesome/*txt`,
		`!css/fontawesome/svgs/brands/**`,
		`!css/fontawesome/svgs/regular/**`,
		`!css/fontawesome/svgs/solid/**`,
		`!js`,
		`!js/**`,
		`!sass`,
		`!sass/**`,
		`!dist.zip`,
		])
	.pipe(gulp.dest("dist"));
})
);


gulp.task('copy-assets', gulp.series('copyCss', 'copyJs')); 
gulp.task('start', gulp.series('copy-assets', 'serve'));
//fare una modifica qualsiasi su (style.css) e (script.js)

//gulp.task('default', gulp.series('minify', 'uglify', 'dist'));

//0. npm i
//1. >gulp copy-assets
//2. >gulp serve (sincronizza browser-editor/minifica i .css concatenandoli in un unico file "style.min.css"); compirme i .js con uglify. Posso continuare a fare le modifiche di stile su style.css e script.js

//Attenzione: Fare una modifica qualisasi su style.css per sincronizzare 
//3. (Finite le modifiche) >gulp dist





		