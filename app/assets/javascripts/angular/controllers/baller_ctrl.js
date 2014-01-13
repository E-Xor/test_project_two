(function(){
  NgApp.controller('BallerCtrl', ['$scope', 'BallersResource', 'GetId',

    function ($scope, BallersResource, GetId) {
      $scope.playerId = GetId.get("ballers");

      console.log('playerId', $scope.playerId);
      $scope.player = BallersResource.get({id: $scope.playerId});
      console.log('scope', $scope);
      console.log('player', $scope.player);
    }

  ]);

})();
