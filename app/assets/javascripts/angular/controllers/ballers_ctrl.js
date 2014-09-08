;(function(){
  NgApp.controller('BallersCtrl', ['$scope', 'BallersResource', 'Go',

    function($scope, BallersResource, Go) {
      $scope.players = BallersResource.query();

      $scope.changeSortIcon = function (id, reverse) {
        $('#sortIndicator').remove();
        var indicator = 'sort_up.png';
        if(reverse) {
          indicator = 'sort_down.png';
        }

        $('#' + id).append("<img id='sortIndicator' src='/assets/"+indicator+"'/>");
      };

      $scope.go = Go.go;
    }
  ]);
})();
