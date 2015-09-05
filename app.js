var express = require( 'express' ) //load express mudle
var path = require('path')
var mongoose = require('mongoose')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var logger = require('morgan')


var port = process.env.PORT || 3000 // PORT=5000 node app.js
var app = express()  // start a web server
var dbUrl = 'mongodb://localhost/MOVIE'
mongoose.connect(dbUrl)

app.set('views', './app/views/pages')
app.set('view engine', 'jade')
//app.use(express.bodyParser())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
	secret: 'MOVIE',
	store: new mongoStore({
		url: dbUrl,
		collection: 'sessions'
	}),
	resave: false,
  	saveUninitialized: true
}))

//app.set('port', 5000)
app.use(express.static(path.join(__dirname,'public')))
app.locals.moment = require('moment')
app.listen(port)

if('development' === app.get('env')){
	app.set('showStackError', true)
	app.use(logger(':method :url :status'))
	app.locals.pretty = true
	mongoose.set('debug', true)
}

require('./config/routes')(app)


console.log('webapp start on ' + port)

