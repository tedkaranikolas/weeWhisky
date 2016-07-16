console.log('Bilo loaded client.js');

var myApp = angular.module("myApp", ["ngRoute", "xeditable", "ui.select", "ngSanitize"]);

// app.run(function(editableOptions) {
//   editableOptions.theme = 'bs3';
// });
//angular routing for FE begins
myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider

    .when('/', {
      templateUrl : '/views/home.html',
    })
    .when('/home', {
      templateUrl : '/views/home.html',
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
      controller : 'AdminWhiskyController',
    })
    .when('/adminscotch', {
      templateUrl : '/views/adminscotch.html',
      controller : 'LoginController'
    })
    .when('/adminwhisky', {
      templateUrl : '/views/adminwhisky.html',
      controller : 'AdminWhiskyController'
    })
    .otherwise({
      redirectTo: '/home'
    });

}]);//angular routing for FE ends
