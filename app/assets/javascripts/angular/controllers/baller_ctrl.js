;(function(){
  NgApp.controller('BallerCtrl', ['$scope', 'BallersResource', 'GetId', 'Go', 'ModalWindow',

    function ($scope, BallersResource, GetId, Go, ModalWindow) {
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
        $scope.player.$update(
          function(){
            Go.go('/ballers');
          },
          function(){
            var messageFromBackend = '';
            if(error.data && error.data.error) { messageFromBackend = error.data.error }
            ModalWindow.show('Error Saving','Error happened updating the player. Please try again later. ' + messageFromBackend);
          }
        );
      };

      $scope.resetPlayer = function () {
        $scope.player = angular.copy($scope.originalPlayer);
      };

      $scope.createPlayer = function () {
        $scope.player.$save(
          function(){
            Go.go('/ballers');
          },
          function(error){
            var messageFromBackend = '';
            if(error.data && error.data.error) { messageFromBackend = error.data.error }
            ModalWindow.show('Error Saving','Error happened saving the player. Please try again later. ' + messageFromBackend);
          }
        );
      };

      $scope.deletePlayer = function () {
        ModalWindow.show('Are you sure?', 'Do you really want to delete ' + $scope.player.first_name + ' ' + $scope.player.last_name + '?')
        .then(function(result){
          $scope.player.$delete(
            function(){
              console.log('Deleted!');
              Go.go('/ballers');
            },
            function(){
              var messageFromBackend = '';
              if(error.data && error.data.error) { messageFromBackend = error.data.error }
              ModalWindow.show('Error Saving','Error happened deleting the player. Please try again later. ' + messageFromBackend);
            }
          );
        });

      };

    }

  ]);

})();
