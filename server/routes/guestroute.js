var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/whiskyDB';

//begin query to whiskyDB
router.post('/queryOut', function (req, res){
  console.log('Biggles is heading to the DB bar with his buddies ' + req.body.keyword + ' ' + ' ' + req.body.region + ' ' + ' ' + req.body.whisky_type);
  var queriedScotch = [];
  pg.connect(connectionString, function(err, client, done){
<<<<<<< HEAD
    var scotchQuery = client.query( "SELECT * FROM whisky WHERE palate::text ILIKE '%" + req.body.keyword + "%' OR whisky_type_id = ' + req.body.whisky_type + ' OR region_id = ' + req.body.region'");
      scotchQuery.on('row', function(row){
=======
    var scotchQuery = client.query( "SELECT * FROM whisky WHERE palate::text ILIKE '%" + req.body.keyword + "%' OR whisky_type = ' + req.body.whisky_type + ' OR region = ' + req.body.region'");
      console.log('Biggles is in! He is in!');
    scotchQuery.on('row', function(row){
>>>>>>> angular_table
      queriedScotch.push(row);
      console.log('Lookee what Biggles found!');
    });
    scotchQuery.on('end', function(){
      console.log(queriedScotch);
      return res.json(queriedScotch);
    });
  });//end whiskyDB connectionString
});//end queryOut POST

module.exports = router;
