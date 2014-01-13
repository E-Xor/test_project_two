(function(){
  NgApp.service('GetId', function () {

    this.get = function(name) {
      var id = undefined;
      _.each(window.location.pathname.split('/'), function(el, i, list) {
        if (el == name) {
          id = list[i+1];
        }
      });

      return id;
    }

  });

})();
