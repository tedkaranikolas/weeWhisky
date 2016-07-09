console.log('Bilo loaded client.js');
var myApp = angular.module("myApp", ["ngRoute"]);

//angular routing for FE begins
myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider

    .when('/login', {
      templateUrl : 'partials/login.html',
      controller : 'LoginController'
    })
    .when('/register', {
      templateUrl : 'partials/register.html',
      controller : 'LoginController'
    })
    .when('/home', {
      templateUrl : 'partials/success.html',
      controller : 'HomeController'
    })
    .when('/whisky', {
      templateUrl : 'partials/whisky.html',
      controller : 'SearchWhiskyController'
    })
    .when('/admin', {
      templateUrl : 'partials/admin.html',
      controller : 'AdminWhiskyController'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);//angular routing for FE ends
