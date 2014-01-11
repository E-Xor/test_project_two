NgApp.controller('BallersCtrl', ['$scope', 'Ballers', function($scope, Ballers) {

    $scope.changeSortIcon = function (id, reverse) {
      $('#sortIndicator').remove();
      var indicator = 'sort_up.png';
      if(reverse) {
        indicator = 'sort_down.png';
      }

      $('#' + id).append("<img id='sortIndicator' src='/assets/"+indicator+"'/>");
    }

    return $scope.players = Ballers.query();
  }
]);
