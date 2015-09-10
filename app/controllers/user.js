var User = require('../models/user')

// confirm the name exist or not
exports.signup_name = function (req, res) {
	var _user = req.body
	var name = _user.name
	//pwd_confirm = req.body.pwd_confirm   //change later
	User.findOne({name: _user.name}, function(err,user){
		if(err){
			console.log(err)
		}
		if(user){
			res.json({success: 0})
		}
	})
}

// signup user
exports.signup = function (req, res) {
	var _user = req.body.user
	pwd_confirm = req.body.pwd_confirm.confirm   //change later
	if (_user.password === pwd_confirm){
		User.findOne({name: _user.name}, function(err,user){
		if(err){
			console.log(err)
		}
		if(user){
			console.log("The user is existing") //change later
			res.send("The user is existing")
		}
		else{
			var __user = new User(_user)
			__user.save(function(err, user){
				if (err){
					console.log(err)
				}
				res.redirect('/user/showsignin')
				})
			}
		})
	}
	else res.send("The two passwords is not matched")
}

// checkout the user name
exports.signin_name = function (req, res) {
	var _user = req.body
	var name = _user.name
	User.findOne({name: name}, function(err,user){
		if(err){
			console.log(err)
		}
		if(user){
		}
		else res.json({success: 0})
	})
}

// signin user
exports.signin = function (req, res) {
	var user = req.body.user
	var name = user.name
	var password = user.password
	User.findOne({name: name}, function(err, user){
		if(err){
			console.log(err)
		}
		if(!user){
			//console.log("The user is not exist") // change later
			res.send("The user is not exist")
		}
		else{
			user.comparePassword(password, function(err, isMatch){
				if(err){
					console.log(err)
				}
				if(isMatch){
					req.session.user = user // save the status of signin
					return res.redirect('/')
					//console.log("singin successful") //change later
				}
				else{
					//console.log("the password is error") // change later
					res.send("The password is error")
				}
		})
		}
	})
}

//showsignin
exports.showsignin = function(req,res){
	res.render('signin',{
	})
}

//showsignup
exports.showsignup = function(req,res){
	res.render('signup',{
	})
}

// logout user
exports.logout = function (req, res) {
	delete req.session.user
	//delete app.locals.user
	res.redirect('/')
}

//user list
exports.list = function (req, res) {
	var index = parseInt( req.query.id || 1)
	var Num = 10
	User.fetch( function (err, users){
		if(err){
			console.log(err)
		}
		res.render('userlist',{
			title: '用户列表',
			users: users.slice( Num * (index -1), Num * index),
			currentPage: index,
			totalPage: Math.ceil( users.length/Num )
		})
	})
}

//midware for user
exports.signinRequired = function (req, res, next){
	var user = req.session.user
	if(!user){
		return res.redirect('/user/showsignin')
	}

	else next()
}

exports.adminRequired = function (req, res, next){
	var user = req.session.user
	if(user.role>10){
		next()
	}
	else res.redirect('/')
}

//update user
exports.update = function (req,res){
	var id = req.params.id
	User.findOne({_id: id}, function (err, user){
		if(err){
			console.log(err)
		}
		else{
			res.render('admin_user',{
				title: '用户更新',
				user: user
			})
		}
	})
}

//new user
exports.new = function (req,res){
	var id = req.params.id
	User.findOne({_id: id}, function (err, user){
		if(err){
			console.log(err)
		}
		else{
			res.render('admin_user',{
				title: 用户更新,
				user: user
			})
		}
	})
}

//delete user
exports.del = function(req, res){
	var id = req.query.id
	if(id) {
		User.remove({_id: id}, function (err, user){
			if(err){
				console.log(err)
			}
			else{
				res.json({success: 1})
			}
		})
	}
}