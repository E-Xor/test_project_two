;(function(){
  NgApp.service('Go', ['$window', function ($window) {

    this.go = function(location) {
      if($window.location.href == location) {
        $window.location.reload();
      } else {
        $window.location.href = location;
      }
    }

  }]);

})();
