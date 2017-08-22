/* Controller for the application's homepage */
var infodump = angular.module("infodump");

infodump.controller("HomepageCtrl", HomepageCtrl);

HomepageCtrl.$inject = ["$scope"];

function HomepageCtrl($scope) {
  console.log("On homepage controller");
  const REGISTRATION_URL = 'api/register'

  // Toggles for the authentication forms.
  $scope.showRegister = true;
  $scope.toggleForms = function() {
    console.log("click");
    $scope.showRegister = !$scope.showRegister;
    console.log($scope.showRegister);
  }

  $scope.registerUser = function() {
    const password = $scope.registerPassword;
    const password2 = $scope.registerConfirmPassword;
    const email = $scope.registerEmail;
    $http.post(REGISTRATION_URL, {
      email:email,
      password: password
    })
      .success(function(data,status) {
        // user has successfully registered so redirect
        // to account creation process.
      })
      .error(function(data,status) {
        // there was some error (e.g. email taken) which
        // needs to be displayed to the user.
      });
  }
}
