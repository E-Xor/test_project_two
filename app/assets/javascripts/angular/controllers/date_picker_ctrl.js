;(function(){
  NgApp.controller('DatePickerCtrl', ['$scope',
    function ($scope) {
      $scope.clear = function () {
        $scope.dt = null;
      };

      $scope.openDatePicker = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
      };

      $scope.dateOptions = {
        showWeeks: false
      };

      $scope.minDate = new Date('1950-12-31');
      $scope.maxDate = new Date('1996-01-01');
      $scope.dt      = new Date('1995-12-31');
    }
  ]);

})();
