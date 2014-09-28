;(function(){
  NgApp.controller('BallerCtrl', ['$scope', 'BallersResource', 'GetId', 'Go', 'ModalWindow',

    function ($scope, BallersResource, GetId, Go, ModalWindow) {
      setTimeout(function () {
        angular.element(".saved-blink").addClass("disappear");
      }, 1000);

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

      // Date Picker

      $scope.minDate = new Date('1950-12-31');
      $scope.maxDate = new Date('1996-01-01');

      $scope.openDatePicker = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        if(typeof $scope.player.born == "undefined") {
          var d = $scope.maxDate
          $scope.player.born = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()-1, 12, 0, 0);
        }

        if(typeof $scope.player.born == "string") {
          // Convert to Date
          var d = new Date($scope.player.born);
          // Avoid possible date change
          // Use noon, it will be properly converted for update
          $scope.player.born = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 12, 0, 0);
        }

        $scope.opened = true;
      };

      $scope.dateOptions = {
        showWeeks: false
      };

      $scope.updatePlayer = function () {
        if(typeof $scope.player.born != "string") {
          // Avoid possible date change
          // Use UTC noon, not browser local time
          var d = $scope.player.born;
          $scope.player.born = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0));
          console.log($scope.player.born);
        }

        angular.element("#player-form").addClass("loading");

        $scope.player.$update(
          function(){
            angular.element("#player-form").removeClass("loading");

            Go.go('/ballers/' + $scope.playerId);
          },
          function(){
            angular.element("#player-form").removeClass("loading");

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
        angular.element("#player-form").addClass("loading");

        $scope.player.$save(
          function(data){
            angular.element("#player-form").removeClass("loading");

            Go.go('/ballers/' + data.id);
          },
          function(error){
            angular.element("#player-form").removeClass("loading");

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
