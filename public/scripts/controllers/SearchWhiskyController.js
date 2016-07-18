//begin SearchWhiskyController
myApp.controller('SearchWhiskyController', ['$scope', '$http', function($scope, $http){
  console.log('Bilo in SearchWhiskyController');

  $scope.queryScotchDB = function(){
    var scotchOut = {
      keyword : $scope.keywordIn,
      region_id: $scope.regionIn,
      whisky_type_id : $scope.whiskyTypeIn,
    };//end queryScotchDB
    console.log('Bilo is sending ', scotchOut);
    $http({
      method: 'POST',
      url: '/queryOut',
      data: scotchOut
    }).then(function(response){
      $scope.allTheScotch = response.data;
      console.log('Bilo is ready for a drink: ', response.data);
    });//end queryScotchDB
//clears all input fields
    $scope.keywordIn = '';
    $scope.scotchRegion = '';
    $scope.whiskyType = '';
  };
  //REGION MENU
  $http({
    method: 'GET',
    url: '/menu/region',
  }).then(function(response){
    console.log(response.data);
      $scope.regions = response.data;
  });
  $http({
    method: 'GET',
    url: '/menu/whisky',
  }).then(function(response){
    console.log(response.data);
      $scope.whiskies = response.data;
  });

}]);//end SearchWhiskyController
