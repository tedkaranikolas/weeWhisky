var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();

app.use(express.static('public'));
app.use(bodyParser.json());

var guestroute = require('./routes/guestroute');
var adminroute = require('./routes/adminroute');

//var router = require('./routes/adminroute');
//use route.js
app.use('/', router);
app.use('/', guestroute);
app.use('/', adminroute);

//base url
router.get( '/', function (req, res){
  console.log( 'Biggles at base url' );
  res.sendFile( path.resolve( 'views/index.html') );
});

//spin server until last call for serverhol
app.listen(5050, 'localhost', function(req, res){
  console.log('Biggles listening on 5050');
});

// //base url
// app.get( '/', function (req, res){
//   console.log( 'Biggles at base url' );
//   res.sendFile( path.resolve( 'views/index.html') );
// });
//
// //begin query to scotchDB
// app.post('/queryOut', function (req, res){
//   console.log('Biggles in queryOut ' + req.body.keyword + ' ' + ' ' + req.body.region + ' ' + ' ' + req.body.scotch_type);
//   var queriedScotch = [];
//   pg.connect(connectionString, function(err, client, done){
//     var scotchQuery = client.query( "SELECT * FROM whisky WHERE palate::text ILIKE '%" + req.body.keyword + "%'");
//     console.log('in DB ', scotchQuery );
//     scotchQuery.on('row', function(row){
//       queriedScotch.push(row);
//       console.log('queriedScotch' + queriedScotch);
//     });
//     scotchQuery.on('end', function(){
//       console.log(queriedScotch);
//       return res.json(queriedScotch);
//     });
//   });//end scotchDB connectionString
// });//end queryOut POST
// var queryString = "SELECT * FROM whisky WHERE palate::text LIKE '%" + req.body.keyword + "%'";
// console.log( 'query string: ' + queryString );
