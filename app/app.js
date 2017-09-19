/*APP FILE FOR ANGULAR JS*/
// declare the module
var infodump = angular.module("infodump", ['ngRoute', 'ngMessages', 'ng']);
/*FRONTEND ROUTING LOGIC FOR ANGULAR JS*/
infodump.factory('sessionService', function sessionServiceFactory() {
  // TODO: methods for api calls here.
  // TODO: token refresh here.
  var sessionService = {};
  sessionService.login = function(token) {
    localStorage.setItem('inf-token', token);
  }
  sessionService.logout = function(token) {
    localStorage.removeItem('inf-token', token);
  }
  sessionService.getToken = function(token) {
    return localStorage.getItem('inf-token');
  }
  sessionService.isLoggedIn = function(token) {
    return localStorage.getItem('inf-token') !== null;
  }
  return sessionService;
});

  infodump.factory('httpRequestInterceptor', ['sessionService',
    function (sessionService) {
      return {
        request: function (config) {

          if (localStorage.getItem('inf-token')) {
            config.headers['authorization'] = localStorage.getItem('inf-token');
          }
          return config;
        }
      };
  }]);

  infodump.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
  });
