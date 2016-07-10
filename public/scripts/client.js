console.log('Bilo loaded client.js');
var myApp = angular.module("myApp", ["ngRoute"]);

//angular routing for FE begins
myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider

    .when('/', {
      templateUrl : '/views/login.html',
      controller : 'LoginController'
    })
    .when('/register', {
      templateUrl : '/views/register.html',
      controller : 'LoginController'
    })
    .when('/home', {
      templateUrl : '/views/login.html',
      controller : 'LoginController'
    })
    .when('/whisky', {
      templateUrl : '/views/whisky.html',
      controller : 'SearchWhiskyController'
    })
    .when('/admin', {
      templateUrl : '/views/admin.html',
      controller : 'AdminWhiskyController',
    })
    .otherwise({
      redirectTo: '/whisky'
    });
}]);//angular routing for FE ends
