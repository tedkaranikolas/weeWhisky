var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/whiskyDB';

router.get('/cask', function(req, res){
  console.log('in cask route');
  var caskResults = [];
  pg.connect(connectionString, function(err, client, done){
    var caskQuery = client.query("SELECT * FROM cask_finish");
    caskQuery.on('row', function(row){
      caskResults.push(row);
    });
    caskQuery.on('end', function(){
      return res.json(caskResults);
    });
    done();
  });
});

router.get('/region', function(req, res){
  console.log('Biggles is in region route');
  var regionResults = [];
  pg.connect(connectionString, function(err, client, done){
    var regionQuery = client.query("SELECT * FROM region");
    regionQuery.on('row', function(row){
      regionResults.push(row);
    });
    regionQuery.on('end', function(){
      return res.json(caskResults);
    });
    done();
  });
});

module.exports = router;
