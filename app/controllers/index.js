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
			movies: movies
		})
	})
	
}