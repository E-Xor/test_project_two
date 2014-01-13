(function(){
  NgApp.factory('BallersResource', ['$resource', function($resource) {
      return $resource('/api/ballers/:id', {
        id: '@id'
      });
    }
  ]);

})();
