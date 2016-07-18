//begin AdminWhiskyController
myApp.controller('AdminWhiskyController', ['$scope', '$http', '$filter', function($scope, $http, $filter){
  console.log('Bilo is in AdminWhiskyController');

  $scope.addScotchDB = function(){
    var scotchEntered = {
      producer : $scope.distilleryBottlerIn,
      expression : $scope.expressionIn,
      palate : $scope.palateIn,
      abv : $scope.abvIn,
      cask_finish_id : $scope.caskFinish,
      region_id : $scope.regionIn,
      whisky_type_id : $scope.whiskyTypeIn
    };//end adminScotchDB
    console.log('Bilo is sending ' + scotchEntered + 'to Biggles.');
    $http({
      method: 'POST',
      url: '/createScotch',
      data: scotchEntered
    }).then(function(){
      $scope.displayScotchDB();
    });//end queryScotchDB

//clears all input fields
    $scope.distilleryBottlerIn = '';
    $scope.expressionIn = '';
    $scope.palateIn = '';
    $scope.abvIn = '';
    $scope.caskFinish = '';
    $scope.whiskyTypeIn = '';
    $scope.regionIn = '';
  };

//begin GET to display all whiskyDB
$scope.displayScotchDB = function(){
  $http({
    method: 'GET',
    url: '/getScotch'
  }).then(function(response){
    $scope.alladMinScotch = response.data;
    console.log('Look at what Bilo found!');
  });
};//end displayScotchDB

//begin DELETE
$scope.deleteScotchDB = function(scotchID){
  var sendID = {id: scotchID};
  $http({
    method: 'DELETE',
    url: '/deleteScotch',
    data: sendID,
    headers: {'Content-Type': 'application/json;charset=utf-8'}
  }).then(function(){
    $scope.displayScotchDB();
    console.log('Bilo drank it.  ALL.');
  });
};
 // $scope.saveScotch = function(data, scotchid, regionid, finishid, whiskiesid){
 //begin UPDATE
 $scope.saveScotch = function(data, scotchid){
   console.log('Bilo hit saveScotch');
   console.log(data);
   var id = scotchid;
   $http({
     method: 'PUT',
     url: '/saveScotch/' + id,
     data: data
   });
   console.log('Bilo hit end of saveScotch');
 };


//ADD WHISKY
$scope.whisky = [
  {
    id : '',
    producer : '',
    expression : '',
    palate : '',
    abv : '',
    cask_finish_id : 1,
    region_id : 1,
    whisky_type_id : 1
  }
];
//ADD ROW FUNCTIONALITY
$scope.addWhisky = function(){
  $scope.inserted = {
    // id: $scope.whisky.length + 1,
    producer : '',
    expression : '',
    palate : '',
    abv : '',
    cask_finish_id : '',
    region_id : '',
    whisky_type_id : ''
  };
  $scope.whisky.push($scope.inserted);
};

//CASK SHOW
$scope.showCask = function(whisky){
  if(whisky.casks && $scope.casks.length){
    var selected = $filter('filter')($scope.casks, {id: whisky.cask});
    return selected.length ? selected[0].text : 'Not set';
  } else {
    return whisky.cask || 'Not set';
  }
};
 //CASK FINISH MENU
 $scope.casks = [];
 $scope.loadCask = function (){
   console.log('in load cask');
   return $scope.casks.length ? null : $http.get('/menu/cask').success(function(data){
     $scope.casks = data;
   });
};
//SHOW REGION
$scope.showRegion = function(whisky){
  if(whisky.region && $scope.region.length){
    var selected = $filter('filter')($scope.region, {id: whisky.region});
    return selected.length ? selected[0].text : 'Not set';
  } else {
    return whisky.region || 'Not set';
  }
};
 //REGION MENU
 $scope.region = [];
 $scope.loadRegion = function (){
   console.log('in load region');
   return $scope.region.length ? null : $http.get('/menu/region').success(function(data){
     $scope.region = data;
   });
 };
 //SHOW WHISKIES
 $scope.showWhiskies = function(whisky){
   if(whisky.whiskies && $scope.whiskies.length){
     var selected = $filter('filter')($scope.region, {id: whisky.whiskies});
     return selected.length ? selected[0].text : 'Not set';
   } else {
     return whisky.whiskies || 'Not set';
   }
 };
 //WHISKY MENU
 $scope.whiskies = [];
 $scope.loadWhisky = function (){
   console.log('in load whisky');
   return $scope.whiskies.length ? null : $http.get('/menu/whisky').success(function(data){
     $scope.whiskies = data;
   });
 };

}]);//end AdminWhiskyController
