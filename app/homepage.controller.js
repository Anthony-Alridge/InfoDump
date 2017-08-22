/* Controller for the application's homepage */
var infodump = angular.module("infodump");

infodump.controller("HomepageCtrl", HomepageCtrl);

HomepageCtrl.$inject = ["$scope"];

function HomepageCtrl($scope) {
  const REGISTRATION_URL = 'api/register';
  const LOGIN_URL = 'api/authenticate';

  // Toggles for the authentication forms.
  $scope.showRegister = true;
  $scope.toggleForms = function() {
    $scope.showRegister = !$scope.showRegister;
  };

 // Form controls.
  $scope.registerUser = function() {
    const password = $scope.registerPass;
    const password2 = $scope.registerPassCon;
    const username = $scope.registerUsername;
    $http.post(REGISTRATION_URL, {
      email:email,
      password: password
    })
      .success(function(data,status) {
        console.log("Account created " + data);
      })
      .error(function(data,status) {
        // There was some error (e.g. email taken) which
        // needs to be displayed to the user.
      });
  };

  $scope.loginUser = function() {
    const password = $scope.loginPassword;
    const username = $scope.loginUsername;
    $http.post(LOGIN_URL, {
      username: username,
      password: password
    })
      .success(function(data,status) {
        console.log("Account created " + data);
      })
      .error(function(data,status) {
        // there was some error (e.g. email taken) which
        // needs to be displayed to the user.
      });
  };
}
