var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/scotchDB';

//begin POST to create scotch
router.post('/createScotch', function (req, res){
  console.log('Biggles distilled ' + req.body.distillery);
  pg.connect(connectionString, function(err, client, done){
    client.query("INSERT INTO whisky ( region, distillery, expression, palate, abv, cask_finish, whisky_type) values ( $1, $2, $3, $4, $5, $6, $7 )",[req.body.region, req.body.distillery, req.body.expression, req.body.palate, req.body.abv, req.body.cask_finish, req.body.whisky_type]);
    res.send(true);
    done();
  });
});
//begin GET for AdminWhiskyController
router.get('/getScotch', function (req, res){
  console.log('Biggles going to the Scotch cellar...');
  var scotchDisplay = [];
  pg.connect(connectionString, function(err, client, done){
    var adminQueriedScotch = client.query("SELECT * FROM whisky ORDER BY id DESC;");
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
    console.log('Biggles 86ed another!');
  });
});//end DELETE

module.exports = router;
