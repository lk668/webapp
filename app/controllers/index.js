var Movie = require('../models/movie')

// home page
exports.home = function(req, res){
	res.render('home', {
			//title: '电影网'
	})
}

// index page
exports.index = function(req, res){
	Movie.fetch(function(err, movies){
		if (err) {
			console.log(err);
		}
		res.render('index', {
			title: '电影主页',
			movies: movies.slice(0,12),
			totalPage: Math.ceil(movies.length/12),
			currentPage: 1
		})
	})
}

// index page
exports.page = function(req, res){
	var page = req.params.id
	var Num = 12
	Movie.fetch(function(err, movies){
		if (err) {
			console.log(err);
		}
		res.render('index', {
			title: '电影主页',
			movies: movies.slice(Num*(page-1),Num*(page-1)+12),
			totalPage: Math.ceil(movies.length/12),
			currentPage: parseInt(page)
		})
	})
	
}