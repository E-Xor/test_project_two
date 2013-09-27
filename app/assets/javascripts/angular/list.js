var PlayersCtrl = ['$scope', '$http', function PlayersCtrl($scope, $http) {

  $scope.players = [
    {name:'Maksim First', checked:true},
    {name:'Maksim Second', checked:false}];

  $scope.addPlayer = function() {
    if($scope.playerName) {
      $scope.players.push({name:$scope.playerName, checked:false});
      $scope.playerName = '';
    }
  };

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.players, function(player) {
      count += player.checked ? 0 : 1;
    });
    return count;
  };

  $scope.delete = function() {
    var oldPlayers = $scope.players;
    $scope.players = [];
    angular.forEach(oldPlayers, function(player) {
      if (!player.checked) $scope.players.push(player);
    });
  };
}]
