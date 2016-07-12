//begin AdminWhiskyController
myApp.controller('AdminWhiskyController', ['$scope', '$http', function($scope, $http){
  console.log('Bilo in AdminWhiskyController');

var app = angular.module("app", ["xeditable", "ngMockE2E"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';

});

  $scope.addScotchDB = function(){
    var scotchEntered = {
      distillery : $scope.distilleryBottlerIn,
      expression : $scope.expressionIn,
      palate : $scope.palateIn,
      abv : $scope.abvIn,
      cask_finish : $scope.caskFinishIn,
      region : $scope.scotchRegionIn,
      whisky_type : $scope.whiskyTypeIn
    };//end adminScotchDB
    console.log('Bilo is sending ' + scotchEntered + 'to Biggles.');
    $http({
      method: 'POST',
      url: '/createScotch',
      data: scotchEntered
    }).then(function(){
      //console.log('Bilo drank it.  ALL.');
      $scope.displayScotchDB();
    });//end queryScotchDB

//clears all input fields
    $scope.distilleryBottlerIn = '';
    $scope.expressionIn = '';
    $scope.palateIn = '';
    $scope.abvIn = '';
    $scope.caskFinishIn = '';
    $scope.whiskyTypeIn = '';
    $scope.scotchRegionIn = '';
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

//begin DELETE for AdminWhiskyController
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

}]);//end AdminWhiskyController
