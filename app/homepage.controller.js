/* Controller for the application's homepage */
var infodump = angular.module("infodump");
// TODO: When server errors returned the form is inactivated.
infodump.controller("HomepageCtrl", HomepageCtrl);

HomepageCtrl.$inject = ["$scope", "$http", "$parse", "$location",
  "sessionService"];

function HomepageCtrl($scope, $http, $parse, $location, sessionService) {
  const REGISTRATION_URL = 'api/auth/register';
  const LOGIN_URL = 'api/auth/authenticate';

  // Toggles for the authentication forms.
  $scope.showRegister = true;
  $scope.toggleForms = function() {
    $scope.showRegister = !$scope.showRegister;
  };

 // Form controls.
 $scope.register = {};
 $scope.login = {};
 $scope.serverMessage = {};

 var processServerMessages = function(form, serverMessage) {
   $scope.serverMessage = serverMessage;
   form[serverMessage.location].$setValidity(serverMessage.type, false);
 };

  $scope.registerUser = function(form) {
    const password = $scope.register.password;
    const username = $scope.register.username;
    $http.post(REGISTRATION_URL, {
      username: username,
      password: password
    })
      .success(function(data,status) {
        console.log("Account created " + data);
        sessionService.login(data.token);
        $location.path('/focus_dashboard')
      })
      .error(function(data,status) {
        console.log(data);
        // There was some error (e.g. username taken) which
        // needs to be displayed to the user.
        processServerMessages(form, data);
      });
  };

  $scope.loginUser = function(form) {
    const password = $scope.login.password;
    const username = $scope.login.username;
    $http.post(LOGIN_URL, {
      username: username,
      password: password
    })
      .success(function(data,status) {
        console.log("Account logged in " + data);
        sessionService.login(data.token);
        $location.path('/focus_dashboard')
      })
      .error(function(data,status) {
        // there was some error (e.g. username taken) which
        // needs to be displayed to the user.
        console.log(data);
        processServerMessages(form, data);
      });
  };
}
