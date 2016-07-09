var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/scotchAdmin';

//passport connection
var passport = require('../strategies/user.js');
var session = require('express-session');

//route inclusion
var register = require('./router/register');
var guestroute = require('./router/guestroute');
var adminroute = require('./router/adminroute');
var login = require('./router/login');
var router = require('./router/routes');

//static folder
app.use(express.static('public'));

//bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//passport session conguguration
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

//use routes
app.use('/', router);
app.use('/register', register);
app.use('/routes', router);
app.use('/login', login);
app.use('/guestroute', guestroute);
app.use('/adminroute', adminroute);

//base url
app.get( '/', function (req, res){
  console.log( 'Biggles at base url' );
  res.sendFile( path.resolve( 'views/index.html') );
});

//spin server until last call for serverhol
app.set('port', process.env.PORT || 5050);
app.listen(app.get('port'), function() {
    console.log('Biggles listening on port', app.get('port'));
});
