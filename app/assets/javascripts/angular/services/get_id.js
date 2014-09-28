;(function(){
  NgApp.service('GetId', ['$window', function ($window) {

    this.get = function(name) {
      var id = undefined;
      _.each($window.location.pathname.split('/'), function(el, i, list) {
        if (el == name) {
          id = list[i+1];
        }
      });

      return id;
    }

  }]);

})();
