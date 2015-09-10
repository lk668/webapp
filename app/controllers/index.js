var Movie = require('../models/movie')

// home page
exports.home = function(req, res){
	res.render('home', {
			//title: '电影网'
	})
}

// index page
exports.index = function(req, res){
	var index = parseInt( req.query.id || 1)
	var Num = 12
	Movie.fetch(function(err, movies){
		if (err) {
			console.log(err);
		}
		res.render('index', {
			title: '电影主页',
			movies: movies.slice(Num * (index-1), Num * index),
			totalPage: Math.ceil(movies.length/Num),
			currentPage: index,
			themeselect: "",
		})
	})
}
