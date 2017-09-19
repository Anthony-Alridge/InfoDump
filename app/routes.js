/*FRONTEND ROUTING LOGIC FOR ANGULAR JS*/

var infodump = angular.module('infodump');

infodump.config(function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');
    $routeProvider
    .when('/focus_dashboard', {
      templateUrl: 'focus_dashboard.html',
      controller: 'FocusDashboardCtrl'
    })
    .when('/', {
      templateUrl: 'homepage.html',
      controller : 'HomepageCtrl'
    });
});
