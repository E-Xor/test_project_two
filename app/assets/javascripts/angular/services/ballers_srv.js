NgApp.factory('Ballers', [
  '$resource', function($resource) {
    return $resource('/ballers/:id', {
      id: '@id'
    });
  }
]);
