;(function(){
  NgApp.factory('BallersResource', ['$resource', function($resource) {
      return $resource('/api/ballers/:id', {id: '@id'},
        {
          update: {
            method: 'put',
            headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
          }
        });
    }
  ]);

})();
