console.log('Bilo loaded client.js');
var myApp = angular.module("myApp", ["ngRoute"]);

//angular routing for FE begins
myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider

    .when('/', {
      templateUrl : 'public/index.html',
      // controller : 'SearchWhiskyController'
    })
    .when('/home', {
      templateUrl : '/views/home.html',
      controller : 'LoginController'
    })
    .when('/whisky', {
      templateUrl : '/views/whisky.html',
      controller : 'SearchWhiskyController'
    })
    .when('/admin', {
      templateUrl : '/views/login.html',
      controller : 'LoginController'
    })
    .when('/adminscotch', {
      templateUrl : '/views/adminscotch.html',
      controller : 'AdminWhiskyController'
    })
    .otherwise({
      redirectTo: '/home'
    });
    // .when('/register', {
    //   templateUrl : '/views/register.html',
    //   controller : 'LoginController'
    // })
}]);//angular routing for FE ends
