//begin AdminWhiskyController
myApp.controller('AdminWhiskyController', ['$scope', '$http', function($scope, $http){
  console.log('Bilo in AdminWhiskyController');

  $scope.adminScotchDB = function(){
    var scotchEntered = {
      distillery : $scope.distilleryBottlerIn,
      expression : $scope.expressionIn,
      palate : $scope.palateIn,
      abv : $scope.abvIn,
      cask_finish : $scope.caskFinishIn,
      region : $scope.scotchRegionIn,
      whisky_type : $scope.whiskyTypeIn
    };//end adminScotchDB
    console.log('Bilo is sending ' + scotchEntered.region);
    $http({
      method: 'POST',
      url: '/createScotch',
      data: scotchEntered
    }).then(function(response){
      $scope.adminScotch = response.data;
      console.log('Bilo is ready for a drink: ' + response.data);
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
}]);
