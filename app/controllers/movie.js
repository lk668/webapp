var Movie = require('../models/movie')
var _ = require('underscore')
var themeArray = {science:'科幻',comedy:'喜剧',terror:'恐怖',love:'爱情',asume:'娱乐',
				  action:'动作', drama:'剧情',war:'战争', anime:'动画', other:'其他', newest: '最新'}

// list theme
exports.theme = function (req, res){
	var theme = themeArray[req.params.theme]
	var index =parseInt( req.query.id || 1 )
	var Num = 12
	Movie.find({theme:theme}, function (err, movies){
		if(err){
			console.log(err)
		}
		res.render('index', {
			title: '电影分类',
			movies: movies.slice( Num * (index-1), Num * index),
			theme: theme,
			currentPage: index,
			totalPage: Math.ceil(movies.length/Num),
			themeselect: "/" + req.params.theme,
		})
	})
}

//detail page
exports.detail = function (req, res){
	var id = req.params.id
	Movie.findById(id, function (err, movie){
		if (movie){
			res.render('detail', {
			title: '电影: ' + movie.title,
			movie: movie
		})
		}
		
	})
	
}

//admin page
exports.save =  function (req, res){
	res.render('admin_movie', {
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
			attribute: '',
			language:''
		}
	})
}
//admin update movie
exports.update = function (req, res){
	var id = req.params.id
	if (id){
		Movie.findById(id,function (err, movie){
			res.render('admin_movie',{
				title: '电影后台录入页',
				movie: movie
			})
		})
	}
}

//admin post movie
exports.new = function (req, res){
	var id = req.body.movie._id 
	var movieObj = req.body.movie
	var _movie
	if (id !== 'undefined'){
		Movie.findById(id, function (err, movie){
			if (err) {
				console.log(err)
			}
			_movie =_.extend(movie, movieObj)
			_movie.save(function (err, movie){
				if(err){
					console.log(err)
				}
				//res.redirect('/movie/'+ movie._id)
				res.redirect('/admin/movie/list/')
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
			flash: movieObj.flash,
			attribute: movieObj.attribute
		})
		_movie.save(function (err, movie){
				if(err){
					console.log(err)
				}
				//res.redirect('/movie/'+ movie._id)
				res.redirect('/admin/movie/list/')
		})
	}
}

//list page
exports.list = function (req, res){
	var index = parseInt( req.query.id || 1 )
	var Num = 10
	Movie.fetch(function (err, movies){
		if (err) {
			console.log(err);
		}
		res.render('movielist', {
			title: '电影列表',
			movies: movies.slice( Num * (index-1), Num * index),
			currentPage: index,
			totalPage: Math.ceil(movies.length/Num)

		})
	})
}


//delete movie list
exports.del = function (req, res){
	var id = req.query.id
	if(id) {
		Movie.remove({_id: id}, function (err, movie){
			if(err){
				console.log(err)
			}
			else{
			res.json({success: 1})
			}
		})
	}
}

