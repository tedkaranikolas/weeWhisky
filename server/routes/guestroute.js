var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/scotchDB';

//app.use(express.static('public'));
// app.use(bodyParser.json());

// //base url
// router.get( '/', function (req, res){
//   console.log( 'Biggles at base url' );
//   res.sendFile( path.resolve( 'views/index.html') );
// });

//begin query to scotchDB
router.post('/queryOut', function (req, res){
  console.log('Biggles in queryOut ' + req.body.keyword + ' ' + ' ' + req.body.region + ' ' + ' ' + req.body.scotch_type);
  var queriedScotch = [];
  pg.connect(connectionString, function(err, client, done){
    var scotchQuery = client.query( "SELECT * FROM whisky WHERE palate::text ILIKE '%" + req.body.keyword + "%'");
    console.log('in DB ', scotchQuery );
    scotchQuery.on('row', function(row){
      queriedScotch.push(row);
      console.log('queriedScotch' + queriedScotch);
    });
    scotchQuery.on('end', function(){
      console.log(queriedScotch);
      return res.json(queriedScotch);
    });
  });//end scotchDB connectionString
});//end queryOut POST

module.exports = router;
//palate::
