/*FRONTEND ROUTING LOGIC FOR ANGULAR JS*/

var infodump = angular.module('infodump');

  infodump.config(function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix("!");
      $locationProvider.html5Mode(false);
      $routeProvider.when('/', {
        templateUrl: 'homepage.html',
        controller : 'HomepageCtrl'
      });
  });
