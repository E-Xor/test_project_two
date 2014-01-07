// NgApp.controller('BallersCtrl', ['$scope', function($scope) {

//   }
// ]);

NgApp.controller('BallersCtrl', ['$scope', 'Ballers', function($scope, Ballers) {
    return $scope.players = Ballers.query();
  }
]);
