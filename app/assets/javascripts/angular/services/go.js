(function(){
  NgApp.service('Go', function () {

    this.go = function(location) {
      window.location.href = location;
    }

  });

})();
