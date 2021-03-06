//Node server for the api
var express  = require('express');
var app      = express();                          // create our app w/ express
var morgan = require('morgan');                    // log requests to the console (express4)
var bodyParser = require('body-parser');           // pull information from HTML POST (express4)
var methodOverride = require('method-override');   // simulate DELETE and PUT (express4)
var cookieParser = require('cookie-parser')
var session = require('express-session')
var path = require('path');
var config = require('./config');
var jwt = require('jsonwebtoken');

    // configuration =================
var port = process.env.PORT || 80;

var jwt_middleware = function(req, res, next) {
  var token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        res.status(401).send();
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    console.log('NO TOKEN');
    res.status(403).send();
  }
};


//THIS DEFINES MIDDLEWARE FOR USE IN THE APP. BASICALLY, WHEN A
//REQUEST IS MADE TO THE SERVE THE REQUEST WILL PASS THROUGH
//THE MIDDLEWARE BELOW IN THE ORDER THEY ARE DECLARED. VIEW
//DOCUMENTION FOR EXPRESS FOR MORE INFO.
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));                                         // log every request to the console
}
app.use(express.static(path.resolve('app/templates')));
app.use(express.static(path.resolve('assets')));
app.use(express.static(path.resolve('app')));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cookieParser());
app.use(session({secret: config.secret}));


// ROUTES
app.use('/api/auth', require('./api/routes/auth'));

app.use('/api/focus', jwt_middleware, require('./api/routes/focus'));
app.use('/api/resource', jwt_middleware, require('./api/routes/resource'));
//application ------------------------------------------------
//app.get('/token', function (req, res) {
   // res.send(req.session.token);
//});

app.get('/', function(req, res){
  res.sendFile(path.resolve('index.html'))
})

var server = app.listen(port);
console.log("starting server on port: " + port)
module.exports = server;
