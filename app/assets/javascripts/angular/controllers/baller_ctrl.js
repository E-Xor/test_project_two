;(function(){
  NgApp.controller('BallerCtrl', ['$scope', 'BallersResource', 'GetId', 'Go',

    function ($scope, BallersResource, GetId, Go) {
      $scope.playerId = GetId.get("ballers");

      if(/^\d+$/.test($scope.playerId) ) {
        $scope.player = BallersResource.get({id: $scope.playerId}, function () {
          $scope.originalPlayer = angular.copy($scope.player);
        });
      }
      else {
        $scope.player = new BallersResource();
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
        console.log('updatePlayer ', $scope.player);
        $scope.player.$update(
          function(){
            console.log('Updated!');
            Go.go('/ballers');
          },
          function(){
            console.log('Error updating');
            alert('Error happened updating the record'); // Make it modal
          }
        );
      };

      $scope.resetPlayer = function () {
        $scope.player = angular.copy($scope.originalPlayer);
      };

      $scope.createPlayer = function () {
        console.log('createPlayer ', $scope.player);
        $scope.player.$save(
          function(){
            console.log('Saved!');
            Go.go('/ballers');
          },
          function(){
            console.log('Error saving');
            alert('Error happened saving the record'); // Make it modal
          }
        );
      };

      $scope.deletePlayer = function () {
        console.log('deletePlayer ', $scope.player);
        if(confirm('Are you sure?')) {
          $scope.player.$delete(
            function(){
              console.log('Deleted!');
              Go.go('/ballers');
            },
            function(){
              console.log('Error deleting');
              alert('Error happened deleting the record'); // Make it modal
            }
          )
        }
      };
    }

  ]);

})();
