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
$scope.

 //CASK FINISH MENU
 $scope.casks = [];
 $scope.loadCasks = function (){
   return $scope.casks.length ? null : $http.get('/menu/cask').success(function(data){
     $scope.casks = data;
   });
 // $http({
 //   method: 'GET',
 //   url: '/menu/cask',
 // }).then(function(response){
 //   console.log(response.data);
 //     $scope.casks = response.data;
 // });
};
 //REGION MENU
 $scope.region = [];
 $scope.loadRegion = function (){
   return $scope.region.length ? null : $http.get('/menu/region').success(function(data){
     $scope.region = data;
   });
 };
 // $http({
 //   method: 'GET',
 //   url: '/menu/region',
 // }).then(function(response){
 //   console.log(response.data);
 //    //  $scope.regionArray = response.data;
 //     $scope.regions = response.data;
 // });
 //WHISKY MENU
 $scope.whiskies = [];
 $scope.loadWhisky = function (){
   return $scope.whiskies.length ? null : $http.get('/menu/whisky').success(function(data){
     $scope.whiskies = data;
   });
 };
 // $http({
 //   method: 'GET',
 //   url: '/menu/whisky',
 // }).then(function(response){
 //   console.log(response.data);
 //     $scope.whiskies = response.data;
 // });
}]);//end AdminWhiskyController
