var infodump = angular.module('infodump');

infodump.directive("match", match);

function match() {
  return {
      require: "ngModel",
      scope: {
          otherModelValue: "=match"
      },
      link: function(scope, element, attributes, ngModel) {

          ngModel.$validators.match = function(modelValue) {
              return modelValue === scope.otherModelValue;
          };

          scope.$watch("otherModelValue", function() {
              ngModel.$validate();
          });
      }
  };
};
