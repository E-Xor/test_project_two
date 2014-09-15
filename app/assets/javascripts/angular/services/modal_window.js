;(function(){
  NgApp.service('ModalWindow', ['$modal',
    function ($modal) {

      this.show = function(title, message) {
        var modalDefaults = {
          templateUrl: 'modalWindow.html',
        };

        modalDefaults.controller = function ($scope, $modalInstance) {
          $scope.modalWindowTitle = title;
          $scope.modalWindowMessage = message;

          $scope.ok = function (result) {
              $modalInstance.close(result);
          };
          $scope.cancel = function (result) {
              $modalInstance.dismiss('cancel');
          };
        }

        return $modal.open(modalDefaults).result;

      };

    }]);

})();
