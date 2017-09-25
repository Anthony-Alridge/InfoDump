/* Controller for the application's homepage */
var infodump = angular.module("infodump");
infodump.controller("FocusDashboardCtrl", FocusDashboardCtrl);

FocusDashboardCtrl.$inject = ['$scope', '$http', '$rootScope', '$uibModal'];

function FocusDashboardCtrl($scope, $http, $rootScope, $uibModal) {
  /* focus data in the format
  * name : 'name',
  * child_focuses: [
  *  name:value ...
]
  */
  const ROOT_FOCUS_URL = 'api/focus/root';
  const CREATE_FOCUS_URL = 'api/focus';
  const GET_FOCUS_URL = 'api/focus?id=';
  $scope.focus = {};
  let parent_id = null;
  $http.get(ROOT_FOCUS_URL)
    .success(function (data) {
       $scope.focus = data.root_focus;
       $rootScope.title = data.root_focus.name;
    })
    .error(function () {
       console.log('error retrieving root focus');
    });

   $scope.getFocusById = function(Id) {
     $http.get(GET_FOCUS_URL + Id)
       .success(function (data) {
          $scope.focus = data.focus;
          $rootScope.title = data.focus.name;
       })
       .error(function () {
          console.log('error retrieving root focus');
       });
   }
    $scope.showCreateFocusModal = function() {
      console.log('open create focus modal');
     $uibModal.open({
    templateUrl: 'modals/createFocus',
    backdrop: true,
    scope: $scope,
    controller: [
      '$scope', '$uibModalInstance', '$http', function($scope, $uibModalInstance, $http) {
        $scope.create = function () {
          const name = $scope.newFocus.name;
          console.log(name);
          console.log($scope);
         $http.post(CREATE_FOCUS_URL, {parent_focus_id: $scope.focus.id, name: name})
           .success(function(newFocus) {
              $scope.focus.child_focuses.push(newFocus);
              $uibModalInstance.dismiss();
           })
           .error(function(err) {
             // do something about the error
             console.log(err);
             $uibModalInstance.dismiss();
           });
        };
        $scope.cancel = function() {
          $uibModalInstance.dismiss();
        };
      }
    ]
  });
};

};

// TODO:
// 1) create a root focus for user upon creation
// 2) get root focus upon first page load
// 3) create new focus
// 4) get focus by id
// 5) delete focus by id
// 6) change focus name by id
// 7) create resource db which stores names and links for a focus
// 8) create resource and attach to focus
// 9) get all resources given focus id
// 10) update resource given resource id
// 11) delete resource
