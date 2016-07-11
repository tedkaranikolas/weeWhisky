var express = require('express');
var app = express();
var path = require('path');
//static folder
app.use(express.static(path.join(__dirname, '../public')));
//app.use(express.static( 'public' ));

var bodyParser = require('body-parser');

//db connection
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/scotchAdmin';

//passport connection
var passport = require('../strategies/user.js');
var session = require('express-session');

//route inclusion
var register = require('./routes/register');
var guestroute = require('./routes/guestroute');
var adminroute = require('./routes/adminroute');
var login = require('./routes/login');
var router = require('./routes/router');

//bodyParser middleware
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));

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
app.use('/login', login);
app.use('/register', register);
app.use('/router', router);
app.use('/', login);

app.use('/', router);

app.use('/', guestroute);
app.use('/', adminroute);

//base url
router.get( '/', function (req, res){
  console.log( 'Biggles at base url' );
  res.sendFile( path.resolve( 'public/index.html') );//was views
});

//spin server until last call for serverhol
app.set('port', process.env.PORT || 5050);
app.listen(app.get('port'), function() {
    console.log('Biggles listening on port', app.get('port'));
});
