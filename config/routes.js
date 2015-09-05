var Index = require('../app/controllers/index')
var Movie = require('../app/controllers/movie')
var User = require('../app/controllers/user')

module.exports = function(app){

	//before handle
	app.use(function(req, res, next){
		user = req.session.user
		app.locals.user = user
		next()
	})

	// index page
	app.get('/', Index.home)
	app.get('/index', User.signinRequired, Index.index)

	// user page
	app.post('/user/signup/name', User.signup_name)
	app.post('/user/signin/name', User.signin_name)
	app.post('/user/signup', User.signup)
	app.post('/user/signin', User.signin)
	app.get('/user/showsignin',User.showsignin)
	app.get('/user/showsignup',User.showsignup)
	app.get('/user/logout', User.logout)
	app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list)
	app.delete('/admin/user/list', User.signinRequired, User.adminRequired, User.del)

	// movie page
	app.get('/index/:theme',  User.signinRequired, Movie.theme)
	app.get('/movie/:id',  User.signinRequired, Movie.detail)

	app.get('/admin/movie', User.signinRequired, User.adminRequired, Movie.save)
	app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update)
	app.post('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new)
	app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list)
	app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del)

}

