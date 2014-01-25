var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/mydb');

var app = express();
app.use(express.bodyParser());

var routes = require('./routes');
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(stylus.middleware(
	{ 
		src: __dirname + '/public',
		compile: compile
	}
));

app.use(express.static(__dirname + '/public'));

//routes
app.get('/', routes.index);
app.post('/login', routes.login);
app.post('/createaccount', routes.createaccount);

//start the server on port 3000
app.listen(3000);
console.log('Listening on port 3000');
