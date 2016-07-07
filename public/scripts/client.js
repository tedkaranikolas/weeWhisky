console.log('Bilo loaded client.js');
var myApp = angular.module("myApp", ["ngRoute"]);

//angular routing for FE begins
myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider

    .when('/home', {
      templateUrl : 'partials/home.html',
    //  controller : 'HomeController'
    })
    .when('/whisky', {
      templateUrl : 'partials/whisky.html',
      controller: 'SearchWhiskyController'
    })
    .otherwise({
      redirectTo: '/home'
    });

}]);//angular routing for FE ends

myApp.controller('SearchWhiskyController', ['$scope', '$http', function($scope, $http){
  console.log('Bilo in SearchWhiskyController');

  $scope.queryScotchDB = function(){
    var scotchOut = {
      keyword : $scope.keywordIn,
      region : $scope.scotchRegion,
      scotch_type : $scope.scotchType,
    };//end queryScotchDB
    console.log('Bilo is sending ' + scotchOut);
    $http({
      method: 'POST',
      url: '/queryOut',
      data: scotchOut
    }).then(function(data){
      console.log(data);
      // $scope.retrieveHero();
    });
    $scope.keywordIn = '';
    $scope.scotchRegion = '';
    $scope.scotchType = '';
  };//end queryScotchDB



}]);
