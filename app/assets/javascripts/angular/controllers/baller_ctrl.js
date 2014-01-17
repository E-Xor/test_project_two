(function(){
  NgApp.controller('BallerCtrl', ['$scope', 'BallersResource', 'GetId',

    function ($scope, BallersResource, GetId) {
      $scope.playerId = GetId.get("ballers");

      if(/^\d+$/.test($scope.playerId) ) {
        $scope.player = BallersResource.get({id: $scope.playerId}, function () {
          $scope.originalPlayer = angular.copy($scope.player);
        });
      }
      else {
        $scope.originalPlayer = {};
      }

      $scope.getAge = function (dateString) {
        if(!dateString) { return ''; }

        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
      };

      $scope.updatePlayer = function () {
        console.log('updatePlayer player', $scope.player);
        $scope.player.$update();
      };

      $scope.resetPlayer = function () {
        $scope.player = angular.copy($scope.originalPlayer);
      };
    }

  ]);

})();
