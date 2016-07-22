var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/whiskyDB';

//begin POST to create scotch
router.post('/createScotch', function (req, res){
  console.log('Biggles distilled ', req.body);
  pg.connect(connectionString, function(err, client, done){
    console.log('in pg connect', req.body);
    client.query("INSERT INTO whisky ( region_id, producer, expression, palate, abv, cask_finish_id, whisky_type_id) values ( $1, $2, $3, $4, $5, $6, $7 )",
    [req.body.region_id, req.body.producer, req.body.expression, req.body.palate, req.body.abv, req.body.cask_finish_id, req.body.whisky_type_id]);
    res.send(true);
    done();
  });
});
//begin GET for AdminWhiskyController
router.get('/getScotch', function (req, res){
  console.log('Biggles going to the Scotch cellar...');
  var scotchDisplay = [];
  pg.connect(connectionString, function(err, client, done){
    var adminQueriedScotch = client.query("SELECT whisky.id, expression, palate, abv, finish, producer, whisky_type, region FROM whisky JOIN cask_finish AS cf ON whisky.cask_finish_id = cf.id JOIN region on whisky.region_id = region.id JOIN whisky_type ON whisky.whisky_type_id = whisky_type.id;");
    adminQueriedScotch.on('row', function(row){
      scotchDisplay.push(row);
    });
    adminQueriedScotch.on('end', function(){
      console.log('Biggles is returning from the cellar');
      return res.json(scotchDisplay);
    });
    done();
  });
});//end GET

//begin DELETE for AdminWhiskyController
router.delete('/deleteScotch', function (req, res){
  console.log('Biggles is gonna pour the rest of it out.');
  pg.connect(connectionString, function(err, client, done){
    client.query("DELETE FROM whisky WHERE id=" + req.body.id);
    if(err){
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
    done();
    console.log('deleted');
  });
});//end DELETE

// router.put('/saveScotch/:id, :region, :finish, :whiskies', function(req, res){
router.put('/saveScotch/:id', function(req, res){
    console.log('Biggles is bringing one down to age', req.body);
    var entry = req.body;
    var id = req.params.id;
  pg.connect(connectionString, function(err, client, done){
    console.log('in pg connect', req.body);
    if (err){
      console.log('an error at pg connect.');
      res.sendStatus(500);
    }
      // client.query('UPDATE whisky ' +
      //     'SET region_id = $1, ' +
      //     'producer = $2, ' +
      //     'expression = $3, ' +
      //     'palate = $4, ' +
      //     'abv = $5, ' +
      //     'cask_finish_id = $6, ' +
      //     'whisky_type_id = $7 ' +
      //     'WHERE id = $8',
    client.query('UPDATE whisky ' +
          'SET region_id = $1, ' +
          'producer = $2, ' +
          'expression = $3, ' +
          'palate = $4, ' +
          'abv = $5, ' +
          'cask_finish_id = $6, ' +
          'whisky_type_id = $7 ' +
          'WHERE id = $8',
     [entry.region_id, entry.producer, entry.expression, entry.palate, entry.abv, entry.casks_finish_id, entry.whisky_type_id, id],
     function(err, result){
       done();
       if (err){
         console.log(err);
         res.sendStatus(500);
         return;
       }
       res.sendStatus(204);
     });
     console.log('Biggles is out of pg-connect');
   });
});

module.exports = router;
// "SELECT * FROM whisky ORDER BY id DESC;"
