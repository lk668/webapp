var express = require( 'express' ) //load express mudle
var bodyParser = require('body-parser')
var path = require('path')
var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var port = process.env.PORT || 3000 // PORT=5000 node app.js
var app = express()  // start a web server
var themeArray = {science:'科幻',comedy:'喜剧',terror:'恐怖',love:'爱情',asume:'娱乐'}
var themeArray1 = ['科幻','喜剧','恐怖','爱情','娱乐']

mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages')
app.set('view engine', 'jade')
//app.use(express.bodyParser())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
//app.set('port', 5000)
app.use(express.static(path.join(__dirname,'public')))
app.locals.moment = require('moment')
app.listen(port)

console.log('webapp start on ' + port)

// index page
app.get('/', function(req, res){
		res.render('home', {
			//title: '电影网'
	})
	
})

// index page
app.get('/index/', function(req, res){
	Movie.fetch(function(err, movies){
		if (err) {
			console.log(err);
		}
		debugger
		res.render('index', {
			title: '电影主页',
			movies: movies
		})
	})
	
})

// index list page
app.get('/index/:theme', function(req, res){
	var theme = themeArray[req.params.theme]
	Movie.find({theme:theme}, function(err, movies){
		if(err){
			console.log(err)
		}
		res.render('index', {
			title: '电影分类',
			movies: movies,
			theme: theme
		})
	})
})

//detail page
app.get('/movie/:id', function(req, res){
	var id = req.params.id
	Movie.findById(id, function(err, movie){
		res.render('detail', {
			title: '电影: ' + movie.title,
			movie: movie
		})
	})
	
})

//admin page
app.get('/admin/movie', function(req, res){
	res.render('admin', {
		title: '电影后台录入页',
		movie:{
			title:'',
			doctor:'',
			country: '',
			year:'',
			poster:'',
			flash:'',
			summary:'',
			theme: '',
			language:''
		}
	})
})
//admin update movie
app.get('/admin/update/:id',function(req, res){
	var id = req.params.id
	if (id){
		Movie.findById(id,function(err, movie){
			res.render('admin',{
				title: '电影后台录入页',
				movie: movie
			})
		})
	}
})

//admin post movie
app.post('/admin/movie/new',function(req, res){
	var id = req.body.movie._id 
	var movieObj = req.body.movie
	var _movie
	if (id !== 'undefined'){
		Movie.findById(id, function(err, movie){
			if (err) {
				console.log(err)
			}
			_movie =_.extend(movie, movieObj)
			_movie.save(function(err, movie){
				if(err){
					console.log(err)
				}
				//res.redirect('/movie/'+ movie._id)
				res.redirect('/admin/list/')
			})
		})
	}
	else {
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			theme: movieObj.theme,
			summary: movieObj.summary,
			flash: movieObj.flash
		})
		_movie.save(function(err, movie){
				if(err){
					console.log(err)
				}
				//res.redirect('/movie/'+ movie._id)
				res.redirect('/admin/list/')
		})
	}
})

//list page
app.get('/admin/list', function(req, res){
	Movie.fetch(function(err, movies){
		if (err) {
			console.log(err);
		}
		res.render('list', {
			title: '电影列表',
			movies: movies
		})
	})
})


//delete movie list
app.delete('/admin/list',function(req, res){
	var id = req.query.id
	if(id) {
		Movie.remove({_id: id}, function(err, movie){
			if(err){
				console.log(err)
			}
			else{
			res.json({success: 1})
			}
		})
	}
})
